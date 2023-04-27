import router from 'next/router';
import { useEffect } from 'react';
import ui from '@/styles/interface/ui.module.sass';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';

import mongoDbConnect from '@/utils/mongoDbConnect';
import SuperUser from '@/models/superUserModel';

import sendEmail from '@/utils/sendEmail';
import User from '@/models/userModel';

interface IChanged {
    changed: boolean;
    error: string;
}

function handleClick() {
    router.replace('/auth/login');
}

const style = {
    border: 'none',
    fontSize: '1.35rem',
    lineHeight: '1.5',
};

export default function ChangePassword(props: IChanged) {
    useEffect(() => {
        const element = document.getElementById('background-video');
        element?.classList.add('bgvideo_hidden');
    }, []);

    return (
        <>
            {props.changed ? (
                <div className="page" style={style}>
                    <p>
                        Your password has been changed successfully.
                        <br />
                        You can now login.
                    </p>
                    <button
                        className={`${ui.button}`}
                        style={style}
                        onClick={handleClick}
                    >
                        <IconLoginBoxLine /> <p>Login</p>
                    </button>
                </div>
            ) : (
                <div className="page" style={style}>
                    {props.error}
                </div>
            )}
        </>
    );
}

export async function getServerSideProps(context: { query: any }) {
    const changed = await changePassword(
        context.query.activator[0],
        context.query.activator[1]
    );
    return {
        props: changed,
    };
}

async function changePassword(
    activator: string,
    password: string
): Promise<IChanged> {
    console.log(activator,' x ', password)
    await mongoDbConnect();
    const activationSuperUser = await SuperUser.updateMany(
        { activator },
        { activator: '', password }
    );
    const activationUser = await User.updateMany(
        { activator },
        { activator: '', password }
    );

    // if (activationSuperUser.modifiedCount === 0 && activationUser.modifiedCount === 0) {
    //     return { changed: false, error: 'This link is no longer active.' };
    // }
 // TODO: change password, - add loading button... send email
    return { changed: true, error: '' };
}

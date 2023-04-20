import router from 'next/router';
import { useEffect } from 'react';
import ui from '@/styles/interface/ui.module.sass';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';

import mongoDbConnect from '@/utils/mongoDbConnect';
import SuperUser from '@/models/superUserModel';

interface IActivation {
    activated: boolean;
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

export default function ActivateAccount(props: IActivation) {
    useEffect(() => {
        const element = document.getElementById('background-video');
        element?.classList.add('bgvideo_hidden');
    }, []);

    return (
        <>
            {props.activated ? (
                <div className="page" style={style}>
                    <p>
                        Your account has been activated successfully.
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
    const activated = activateAccount(context.query.activator);
    return {
        props: activated,
    };
}

async function activateAccount(activator: string): Promise<IActivation> {
    await mongoDbConnect();
    let activation = await SuperUser.findOneAndUpdate(
        { activator },
        { active: true, activator: '' }
    );
    if (!activation) {
        return { activated: false, error: 'Error during account acivation.' };
    }

    return { activated: true, error: '' };
}

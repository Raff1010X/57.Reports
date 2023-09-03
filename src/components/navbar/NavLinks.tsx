// Links in Navbar.tsx
import { signOut } from 'next-auth/react';
import IconDocumentsOutline from '../../assets/icons/IconDocumentsOutline';
import IconFolderAdd from '../../assets/icons/IconFolderAdd';
import IconLoginBoxLine from '../../assets/icons/IconLoginBoxLine';
import IconLogoutBoxLine from '../../assets/icons/IconLogoutBoxLine';
import IconUser from '../../assets/icons/IconUser';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectIsSuperUser,
    selectIsUserLogged,
    userSignOut,
} from '../../store/slices/auth/authSlice';

import NavLink from './NavLink';
import { useRouter } from 'next/router'

interface NavLinks {
    handleClick: () => void;
}

export default function NavLinks(props: NavLinks) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isUserLogged = useAppSelector(selectIsUserLogged);
    const isSuperUser = useAppSelector(selectIsSuperUser);

    function handleClickLogOut() {

        signOut({ redirect: false })
            .then(() => {
                localStorage.removeItem('user');
                dispatch(userSignOut());
                props.handleClick();
            })
            .catch((err) => {
                router.push('/');
                console.log(err);
            });

    }

    return (
        <>
            {isUserLogged && (
                <>
                    {isSuperUser && (
                        <NavLink
                            linkTo={'/newreport'}
                            text={'New report'}
                            icon={IconFolderAdd}
                            handleClick={props.handleClick}
                        />
                    )}
                    <NavLink
                        linkTo={'/reports'}
                        text={'Reports'}
                        icon={IconDocumentsOutline}
                        handleClick={props.handleClick}
                    />
                    {isSuperUser && (
                        <NavLink
                            linkTo={'/user'}
                            text={'User'}
                            icon={IconUser}
                            handleClick={props.handleClick}
                        />
                    )}
                    <NavLink
                        linkTo={'/logout'}
                        className={'link flex-right'}
                        text={'Logout'}
                        icon={IconLogoutBoxLine}
                        handleClick={handleClickLogOut}
                    />
                </>
            )}

            {!isUserLogged && (
                <NavLink
                    linkTo={'/auth/login'}
                    className={'link flex-right'}
                    text={'Login'}
                    icon={IconLoginBoxLine}
                    handleClick={props.handleClick}
                />
            )}
        </>
    );
}

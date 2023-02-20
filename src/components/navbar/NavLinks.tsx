// Links in Navbar.tsx
import IconDocumentsOutline from '@/assets/icons/IconDocumentsOutline';
import IconFolderAdd from '@/assets/icons/IconFolderAdd';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';
import IconLogoutBoxLine from '@/assets/icons/IconLogoutBoxLine';
import IconUser from '@/assets/icons/IconUser';
import { useAppSelector } from '@/store/hooks';
import { selectIsSuperUser, selectIsUserLogged } from '@/store/slices/auth/authSlice';

import NavLink from './NavLink';

interface NavLinks {
    handleClick: () => void;
}

export default function NavLinks(props: NavLinks) {
    const isUserLogged = useAppSelector(selectIsUserLogged);
    const isSuperUser = useAppSelector(selectIsSuperUser);

    function handleClickLogIn() {
        props.handleClick();
    }

    function handleClickLogOut() {
        props.handleClick();
    }

    return (
        <>
            {isUserLogged && (
                <>
                    {isSuperUser && <NavLink
                        linkTo={'/newreport'}
                        text={'New report'}
                        icon={IconFolderAdd}
                        handleClick={props.handleClick}
                    />}
                    <NavLink
                        linkTo={'/reports'}
                        text={'Reports'}
                        icon={IconDocumentsOutline}
                        handleClick={props.handleClick}
                    />
                    {isSuperUser && <NavLink
                        linkTo={'/user'}
                        text={'User'}
                        icon={IconUser}
                        handleClick={props.handleClick}
                    />}
                    <NavLink
                        linkTo={'/auth/logout'}
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
                    handleClick={handleClickLogIn}
                />
            )}
        </>
    );
}

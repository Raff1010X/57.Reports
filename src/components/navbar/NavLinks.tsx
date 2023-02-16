// Links in Navbar.tsx
import IconDocumentsOutline from '@/assets/icons/IconDocumentsOutline';
import IconFolderAdd from '@/assets/icons/IconFolderAdd';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';
import IconLogoutBoxLine from '@/assets/icons/IconLogoutBoxLine';
import IconUser from '@/assets/icons/IconUser';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsUserLogged, selectIsUserLogged } from '@/store/slices/user/userSlice';

import NavLink from './NavLink';

interface NavLinks {
    handleClick: () => void;
}

export default function NavLinks(props: NavLinks) {

    const dispatch = useAppDispatch();
    const isUserLogged = useAppSelector(selectIsUserLogged);

    function handleClickLogInOut() {
        dispatch(setIsUserLogged(!isUserLogged))
        props.handleClick()
    }

    return (
        <>
            {isUserLogged && (
                <>
                    <NavLink
                        linkTo={'/newreport'}
                        text={'New report'}
                        icon={IconFolderAdd}
                        handleClick={props.handleClick}
                    />
                    <NavLink
                        linkTo={'/reports'}
                        text={'Reports'}
                        icon={IconDocumentsOutline}
                        handleClick={props.handleClick}
                    />
                    <NavLink
                        linkTo={'/user'}
                        text={'User'}
                        icon={IconUser}
                        handleClick={props.handleClick}
                    />
                    <NavLink
                        linkTo={'/login'}
                        className={'link flex-right'}
                        text={'Logout'}
                        icon={IconLogoutBoxLine}
                        handleClick={handleClickLogInOut}
                    />
                </>
            )}

            {!isUserLogged && (
                <NavLink
                    linkTo={'login'}
                    className={'link flex-right'}
                    text={'Login'}
                    icon={IconLoginBoxLine}
                    handleClick={handleClickLogInOut}
                />
            )}
        </>
    );
}

// Links in Navbar.tsx
import IconDocumentsOutline from '@/assets/icons/IconDocumentsOutline';
import IconFolderAdd from '@/assets/icons/IconFolderAdd';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';
import IconLogoutBoxLine from '@/assets/icons/IconLogoutBoxLine';
import IconUser from '@/assets/icons/IconUser';

import { useState } from 'react';
import NavLink from './NavLink';

interface NavLinks {
    handleClick: () => void;
}

export default function NavLinks(props: NavLinks) {
    const [logged, setLogged] = useState(true);

    return (
        <>
            {logged && (
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
                        handleClick={props.handleClick}
                    />
                </>
            )}

            {!logged && (
                <NavLink
                    linkTo={'login'}
                    className={'link flex-right'}
                    text={'Login'}
                    icon={IconLoginBoxLine}
                    handleClick={props.handleClick}
                />
            )}
        </>
    );
}

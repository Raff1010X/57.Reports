// Links in Navbar.tsx
import IconDocumentsOutline from '@/assets/icons/IconDocumentsOutline';
import IconFolderAdd from '@/assets/icons/IconFolderAdd';
import IconLoginBoxLine from '@/assets/icons/IconLoginBoxLine';
import IconLogoutBoxLine from '@/assets/icons/IconLogoutBoxLine';
import IconUser from '@/assets/icons/IconUser';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Links() {
    const router = useRouter();

    const [logged, setLogged] = useState(true);

    return (
        <>
            {logged && (
                <>
                    <Link
                        className={
                            'link' +
                            (router.pathname == '/newreport'
                                ? ' link--active'
                                : '')
                        }
                        href={'newreport'}
                    >
                        <IconFolderAdd width="1.5rem" height="1.5rem" />
                        New report
                    </Link>
                    <Link
                        className={
                            'link' +
                            (router.pathname == '/reports'
                                ? ' link--active'
                                : '')
                        }
                        href={'reports'}
                    >
                        <IconDocumentsOutline width="1.5rem" height="1.5rem" />
                        Reports
                    </Link>
                    <Link
                        className={
                            'link' +
                            (router.pathname == '/user' ? ' link--active' : '')
                        }
                        href={'user'}
                    >
                        <IconUser width="1.5rem" height="1.5rem" />
                        User
                    </Link>
                    <Link
                        className={
                            'link flex-right' +
                            (router.pathname == '/login' ? ' link--active' : '')
                        }
                        href={'login'}
                    >
                        <IconLogoutBoxLine width="1.5rem" height="1.5rem" />
                        Logout
                    </Link>
                </>
            )}

            {!logged && (
                <Link
                    className={
                        'link flex-right' +
                        (router.pathname == '/login' ? ' link--active' : '')
                    }
                    href={'login'}
                >
                    <IconLoginBoxLine width="1.5rem" height="1.5rem" />
                    Login
                </Link>
            )}
        </>
    );
}

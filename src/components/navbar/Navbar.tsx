// Navbar for all pages provided by Layaut.tsx
import style from '@/components/navbar/Navbar.module.css';

import Links from './Links';
import Logo from './Logo';
import Theme from './Theme';

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <Logo/>
            <Links />
            <Theme/>
        </nav>
    );
}

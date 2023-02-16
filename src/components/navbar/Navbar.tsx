// Navbar for all pages provided by Layaut.tsx
import Burger from './Burger';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Theme from './Theme';
import { useState } from 'react';

export default function Navbar() {
    const [menuActive, setMenuActive] = useState(false);
    const [className, setClassName] = useState('burger-menu');

    function handleClickBurger() {
        if (!menuActive) setClassName('burger-menu burger-menu--active');
        if (menuActive) setClassName('burger-menu burger-menu--inactive');
        setMenuActive((prevState: boolean) => !prevState);
    }

    return (
        <nav className="navbar">
            <Logo handleClick={handleClickBurger} />
            <div className={className}>
                <NavLinks handleClick={handleClickBurger} />
                <Theme handleClick={handleClickBurger} />
            </div>
            <Burger menuActive={menuActive} handleClick={handleClickBurger} />
        </nav>
    );
}

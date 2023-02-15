// Navbar for all pages provided by Layaut.tsx
import Burger from './Burger';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Theme from './Theme';
import { useState } from 'react';


export default function Navbar() {
    const [menuActive, setMenuActive] = useState(false);

    function handleClickBurger() {
        setMenuActive((prevState: boolean) => !prevState);
    }

    let className = 'burger-menu burger-menu--active';
    if (!menuActive) className = 'burger-menu';

    return (
        <nav className="navbar">
            <Logo />
            <div className={className}>
                <NavLinks handleClick={handleClickBurger} />
                <Theme handleClick={handleClickBurger} />
            </div>
            <Burger menuActive={menuActive} handleClick={handleClickBurger} />
        </nav>
    );
}

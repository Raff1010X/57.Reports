// Navbar for all pages provided by Layaut.tsx
import Burger from './Burger';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Theme from './Theme';
import { useState } from 'react';

interface MenuActive {
    menuActive: boolean;
    className: string;
}

const initialMenuActive = {
    menuActive: false,
    className: 'burger-menu',
};

export default function Navbar() {
    const [menuActive, setMenuActive] = useState(initialMenuActive);

    function handleClickBurger() {
        setMenuActive((prevState: MenuActive) => {
            const className = prevState.menuActive
                ? 'burger-menu burger-menu--inactive'
                : 'burger-menu burger-menu--active';
            return { menuActive: !prevState.menuActive, className };
        });
    }

    return (
        <nav className="navbar">
            <Logo handleClick={handleClickBurger} menuActive={menuActive.menuActive}/>
            <div className={menuActive.className}>
                <NavLinks handleClick={handleClickBurger} />
                <Theme handleClick={handleClickBurger} />
            </div>
            <Burger
                menuActive={menuActive.menuActive}
                handleClick={handleClickBurger}
            />
        </nav>
    );
}

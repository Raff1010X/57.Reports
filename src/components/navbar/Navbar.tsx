// Navbar for all pages provided by Layaut.tsx
import Burger from './Burger';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Theme from './Theme';
import { useState } from 'react';

interface MenuActive {
    isActive: boolean;
    className: string;
}

const initialMenuActive = {
    isActive: false,
    className: 'burger-menu',
};

export default function Navbar() {
    const [menuActive, setMenuActive] = useState(initialMenuActive);

    function handleClickBurger() {
        setMenuActive((prevState: MenuActive) => {
            const className = prevState.isActive
                ? 'burger-menu burger-menu--inactive'
                : 'burger-menu burger-menu--active';
            const newMenuActive = { isActive: !prevState.isActive, className };
            return newMenuActive;
        });
    }

    return (
        <nav className="navbar">
            <Logo handleClick={handleClickBurger} />
            <div className={menuActive.className}>
                <NavLinks handleClick={handleClickBurger} />
                <Theme handleClick={handleClickBurger} />
            </div>
            <Burger
                menuActive={menuActive.isActive}
                handleClick={handleClickBurger}
            />
        </nav>
    );
}

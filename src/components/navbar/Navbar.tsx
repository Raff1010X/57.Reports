// Navbar for all pages provided by Layaut.tsx
import Burger from './Burger';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Theme from './Theme';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectIsUserLogged } from '@/store/slices/auth/authSlice';

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
    const isUserLoged = useAppSelector(selectIsUserLogged);

    useEffect(() => {
        setMenuActive(() => {
            return {
                menuActive: false,
                className: 'burger-menu',
            };
        });
    }, [isUserLoged]);

    function handleClickBurger() {
        setMenuActive((prevState: MenuActive) => {
            const className = prevState.menuActive
                ? 'burger-menu burger-menu--inactive'
                : 'burger-menu burger-menu--active';
            return { menuActive: !prevState.menuActive, className };
        });
        if (menuActive.className === 'burger-menu burger-menu--active') setTimeout(()=>{
            setMenuActive(() => {
                return {
                    menuActive: false,
                    className: 'burger-menu',
                };
            });
        },700)
    }

    return (
        <nav className="navbar">
            <Logo
                handleClick={handleClickBurger}
                menuActive={menuActive.menuActive}
            />
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

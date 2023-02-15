import IconHamburgerMenu from '@/assets/icons/IconHamburgerMenu';
import IconClose from '@/assets/icons/IconClose';

interface Burger {
    menuActive: boolean;
    handleClick: () => void;
}

export default function Burger(props: Burger) {
    return props.menuActive ? (
        <IconClose className="burger" onClick={props.handleClick} />
    ) : (
        <IconHamburgerMenu className="burger" onClick={props.handleClick} />
    );
}

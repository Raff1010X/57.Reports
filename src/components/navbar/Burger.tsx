import IconHamburgerMenu from '../../assets/icons/IconHamburgerMenu';
import IconClose from '../../assets/icons/IconClose';

interface Burger {
    menuActive: boolean;
    handleClick: () => void;
}

export default function Burger(props: Burger) {
    return props.menuActive ? (
        <IconClose data-testid="close-icon"  className="burger" onClick={props.handleClick} />
    ) : (
        <IconHamburgerMenu data-testid="hamburger-icon" className="burger" onClick={props.handleClick} />
    );
}

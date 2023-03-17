// Logo in Navbar.tsx
import IconFiletypePdf from '../../assets/icons/IconFiletypePdf';
import { useAppSelector } from '../../store/hooks';
import { selectIsUserLogged } from '../../store/slices/auth/authSlice';
import Link from 'next/link';

interface Logo {
    menuActive: boolean;
    handleClick: () => void;
}

export default function Logo(props: Logo) {
    const isUserLogged = useAppSelector(selectIsUserLogged);

    function handleClick() {
        if (props.menuActive) props.handleClick();
    }

    return (
        <>
            <Link
                className="link font-xl"
                href={isUserLogged ? '/' : '/auth/login'}
                onClick={handleClick}
            >
                <IconFiletypePdf data-testid="pdf-icon" width="2rem" height="2rem" />
                Report creator
            </Link>
        </>
    );
}

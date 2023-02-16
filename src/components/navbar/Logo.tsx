// Logo in Navbar.tsx
import IconFiletypePdf from '@/assets/icons/IconFiletypePdf';
import Link from 'next/link';

interface Logo {
    menuActive: boolean;
    handleClick: () => void;
}

export default function Logo(props: Logo) {
    function handleClick() {
        if (props.menuActive) props.handleClick();
    }

    return (
        <>
            <Link
                className="link font-xl"
                href={'/'}
                onClick={handleClick}
            >
                <IconFiletypePdf width="2rem" height="2rem" />
                Report creator
            </Link>
        </>
    );
}

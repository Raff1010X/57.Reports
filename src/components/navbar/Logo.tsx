// Logo in Navbar.tsx
import IconFiletypePdf from '@/assets/icons/IconFiletypePdf';
import Link from 'next/link';

interface Logo {
    handleClick: () => void;
}

export default function Logo(props: Logo) {
    return (
        <>
            <Link className="link font-xl" href={'/'} onClick={props.handleClick}>
                <IconFiletypePdf width="2rem" height="2rem" />
                Report creator
            </Link>
        </>
    );
}

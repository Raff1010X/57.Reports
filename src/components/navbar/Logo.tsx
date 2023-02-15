// Logo in Navbar.tsx
import IconFiletypePdf from '@/assets/icons/IconFiletypePdf';
import Link from 'next/link';

export default function Logo() {
    return (
        <>
            <Link className="link font-xl" href={'/'}>
                <IconFiletypePdf width="2rem" height="2rem" />
                Report creator
            </Link>
        </>
    );
}

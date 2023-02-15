// Link in Links.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLink {
    linkTo: string;
    className?: string;
    text: string;
    icon: any;
    handleClick: () => void;
}

export default function NavLink(props: NavLink) {
    const router = useRouter();
    return (
        <Link
            className={
                (props.className ? props.className : 'link') +
                (router.pathname === props.linkTo ? ' link--active' : '')
            }
            href={props.linkTo}
            onClick={props.handleClick}
        >
            <props.icon width="1.5rem" height="1.5rem" />
            {props.text}
        </Link>
    );
}

// wraps Components in _app.tsx provides navbar to all pages
import { ReactElement } from 'react';
import Navbar from '../navbar/Navbar';

interface Layout {
    className: string; // local font name
    children: ReactElement;
}

export default function Layout(props: Layout) {
    return (
        <div className={props.className}>
            <Navbar />
            {props.children}
        </div>
    );
}

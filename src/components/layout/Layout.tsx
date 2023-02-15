import { ReactElement } from "react";
import Navbar from "../navbar/Navbar";

interface Layout {
    className: string; 
    children: ReactElement;
}

export default function Layout(props: Layout) {
    return (
        <div className={props.className}>
            <Navbar/>
            {props.children}
        </div>
    )
}
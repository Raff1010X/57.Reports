// wraps Components in _app.tsx provides navbar to all pages
import { useAppSelector } from '../../store/hooks';
import { selectIsUserLogged } from '../../store/slices/auth/authSlice';
import { ReactElement, useRef } from 'react';
import BackgroundVideo from '../BackgroundVideo';
import Message from '../message/Message';
import Navbar from '../navbar/Navbar';
import { fontInter } from '../../assets/fonts/fontLoader';
import { useRouter } from 'next/router';

interface Layout {
    children: ReactElement;
}

export default function Layout(props: Layout) {
    const router = useRouter();
    const isUserLogged = useAppSelector(selectIsUserLogged);
    return (
        <>
            <div className={`${fontInter.className} layout`}>
                <Navbar />
                {props.children}
                <Message />
            </div>
            {(!isUserLogged && router.pathname !== '/404') && (
                <BackgroundVideo />
            )}
        </>
    );
}

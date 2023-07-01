// wraps Components in _app.tsx provides navbar to all pages
import { useAppDispatch } from '../../store/hooks';
import { userSignIn } from '../../store/slices/auth/authSlice';
import { ReactElement, useEffect } from 'react';
import BackgroundVideo from '../BackgroundVideo';
import Message from '../message/Message';
import Navbar from '../navbar/Navbar';
import { fontInter } from '../../assets/fonts/fontLoader';
import { getSession } from 'next-auth/react';

interface Layout {
    children: ReactElement;
}

export default function Layout(props: Layout) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getSession().then((sesion) => {
            if (sesion) dispatch(userSignIn(sesion?.user));
        });
    }, [dispatch]);

    useEffect(() => {
        addEventListener('resize', () => {
            document.documentElement.style.setProperty(
                '--vh',
                `${window.innerHeight}px`
            );
        });
        return () => {
            removeEventListener('resize', () => {});
        };
    }, []);

    return (
        <>
            <div className={`${fontInter.className} layout`}>
                <Navbar />
                {props.children}
                <Message />
            </div>
            <BackgroundVideo />
        </>
    );
}

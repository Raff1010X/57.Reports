// wraps Components in _app.tsx provides navbar to all pages
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectIsUserLogged,
    userSignIn,
} from '../../store/slices/auth/authSlice';
import { ReactElement, useEffect, useRef } from 'react';
import BackgroundVideo from '../BackgroundVideo';
import Message from '../message/Message';
import Navbar from '../navbar/Navbar';
import { fontInter } from '../../assets/fonts/fontLoader';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

interface Layout {
    children: ReactElement;
}

export default function Layout(props: Layout) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isUserLogged = useAppSelector(selectIsUserLogged);

    useEffect(() => {
        getSession().then((sesion) => {
            if (sesion) dispatch(userSignIn(sesion?.user));
        });
    }, [dispatch]);

    return (
        <>
            <div className={`${fontInter.className} layout`}>
                <Navbar />
                {props.children}
                <Message />
            </div>
            {!isUserLogged && router.pathname !== '/404' && <BackgroundVideo />}
        </>
    );
}

import ui from '../styles/ui.module.sass';
import { fontInter } from '../assets/fonts/fontLoader';
import IconFiletypePdf from '../assets/icons/IconFiletypePdf';
import { useRouter } from 'next/router';
import { selectIsUserLogged } from '../store/slices/auth/authSlice';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';

export default function BackgroundVideo() {
    const router = useRouter();
    const isUserLogged = useAppSelector(selectIsUserLogged);

    function handleClick() {
        if (navigator.maxTouchPoints > 0)
            setTimeout(() => navigateToLogin(), 900);
        else navigateToLogin();
    }

    function navigateToLogin() {
        if (isUserLogged) {
            const element = document.getElementById('background-video');
            element?.classList.add('bgvideo_hidden');
            element?.classList.remove('bgvideo_show');
        } else router.replace('/auth/login');
    }

    let login = "Login"
    if (isUserLogged) login= "Enter"

    return (
        <div className={`bgvideo`} id="background-video">
            <video
                data-testid="video"
                className="video"
                playsInline
                autoPlay
                loop
                muted
                preload="auto"
            >
                <source
                    src="/pexels-koolshooters-6980918.webm"
                    type="video/webm"
                />
            </video>
            <div className={`bgvideo-content ${fontInter.className}`}>
                <IconFiletypePdf
                    data-testid="icon"
                    width="10rem"
                    height="10rem"
                    className="icon-shadow"
                />
                <p className="bgvideo-title">Report creator</p>
                <p className="bgvideo-text">
                    Create audit reports <br />
                    and share them whith your team
                </p>
                <button
                    className={`${ui.button} bgvideo-button`}
                    onClick={handleClick}
                >
                    {login}
                </button>
            </div>
        </div>
    );
}

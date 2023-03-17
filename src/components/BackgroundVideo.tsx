import ui from '../styles/interface/ui.module.sass';
import { fontInter } from '../assets/fonts/fontLoader';
import IconFiletypePdf from '../assets/icons/IconFiletypePdf';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectIsUserLogged, selectLoggedOut } from '../store/slices/auth/authSlice';

export default function BackgroundVideo() {
    const router = useRouter();

    function handleClick() {
        router.replace('/auth/login');
    }

    const isUserLogged = useSelector(selectIsUserLogged);
    const loggedOut = useSelector(selectLoggedOut);
    let className = 'bgvideo';
    if (!loggedOut) className = 'bgvideo bgvideo-no_animation';

    return (
        <>
            {!isUserLogged ? (
                <div className={className} id="background-video">
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
                            Login
                        </button>
                    </div>
                </div>
             ) : null} 
        </>

    );
}

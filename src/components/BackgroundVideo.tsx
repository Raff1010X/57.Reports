import Link from 'next/link';
import ui from '@/styles/interface/ui.module.sass';
import { fontInter } from '@/assets/fonts/fontLoader';
import IconFiletypePdf from '@/assets/icons/IconFiletypePdf';
import { useRouter } from 'next/router';

export default function BackgroundVideo() {
    const router = useRouter();

    function handleClick() {
        router.replace('/auth/login')
    }
    return (
        <div className="bgvideo" id="background-video">
            <video
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
                <IconFiletypePdf width="10rem" height="10rem" />
                <p className="bgvideo-title">Report creator</p>
                <p className="bgvideo-text">
                    Create audit reports <br />
                    and share them whith your team
                </p>
                <button
                    className={`${ui.button} bgvideo-button`}
                    onClick={handleClick}
                    // href='/auth/login'
                >
                    Login
                </button>
            </div>
        </div>
    );
}

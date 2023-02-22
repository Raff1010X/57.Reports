import style from '@/styles/components/background-video.module.sass';

export default function BackgroundVideo() {
    return (
        <div className={style.bgvideo}>
            <video
                className={style.video}
                playsInline
                autoPlay
                loop
                muted
                preload="auto"
            >
                <source src="./pexels-koolshooters-6980918.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

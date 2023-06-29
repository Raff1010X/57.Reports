import { useEffect } from "react";

export default function LogOut() {

    useEffect(() => {
        const element = document.getElementById('background-video');
        element?.classList.add('bgvideo_show');
        element?.classList.remove('bgvideo_hidden');
    }, []);
    
    return (
        <div className="page">
            <div className="page-content">
                You have been succesfully logged out.
            </div>
        </div>
    );
}

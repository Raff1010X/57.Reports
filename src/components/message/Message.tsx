import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    hideMessage,
    selectMessage,
} from '@/store/slices/message/messageSlice';
import { useEffect, useRef } from 'react';

// global message in Layout.tsx
export default function Message() {
    const reff = useRef<HTMLDivElement>(null);
    const message = useAppSelector(selectMessage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message !== '') reff?.current?.classList.add('message--visible');
    }, [message]);

    function handleClick() {
        reff?.current?.classList.remove('message--visible');
        setTimeout(()=>{dispatch(hideMessage())}, 300);
    }

    const classname = (message !== "") ? "message-background" : "message-background--start"

    return (
        <div className={classname} ref={reff} onClick={handleClick}>
            <div className="message-box">
                <div className="message">{message}</div>

                <button className="message-button" tabIndex={-1}>Ok</button>
            </div>
        </div>
    );
}

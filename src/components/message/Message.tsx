import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    hideMessage,
    selectMessage,
} from '../../store/slices/message/messageSlice';
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
        setTimeout(() => {
            dispatch(hideMessage());
        }, 300);
    }

    const classname =
        message !== '' ? 'message-background' : 'message-background--start';

    return message ? (
        <div className={classname} ref={reff} onClick={handleClick} data-testid="messagebox">
            <div className="message-box">
                <div className="message">{message}</div>

                <button className="message-button">Ok</button>
            </div>
        </div>
    ) : null;
}

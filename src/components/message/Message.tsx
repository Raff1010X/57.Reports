import { useAppDispatch } from '@/store/hooks';
import { setMessage } from '@/store/slices/message/messageSlice';
import { useRef } from 'react';

// global message in Layout.tsx
export default function Message() {

    const reff = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch();

    function hideMessage() {
        dispatch(setMessage({message: '', reff}));
    }

    return (
        <div id="message" className="message message--visible" onClick={hideMessage} ref={reff}>
            Message
        </div>
    );
}

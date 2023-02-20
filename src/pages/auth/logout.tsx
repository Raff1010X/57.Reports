import { useAppDispatch } from '@/store/hooks';
import { userLogOutAsync } from '@/store/slices/auth/authAPI';
import { useEffect } from 'react';

export default function Login() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userLogOutAsync());
    }, []);

    return (
        <div className="page">
            <div className="page-content">You were succesfully logged out.</div>
        </div>
    );
}

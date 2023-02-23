import { useAppDispatch } from '@/store/hooks';
import { userLogOutAsync } from '@/store/slices/auth/authAPI';
import { setLoggedOut } from '@/store/slices/auth/authSlice';
import { useEffect } from 'react';

export default function Login() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userLogOutAsync());
        dispatch(setLoggedOut())
    }, []);

    return (
        <div className="page">
            <div className="page-content">You have successfully been logged out!</div>
        </div>
    );
}

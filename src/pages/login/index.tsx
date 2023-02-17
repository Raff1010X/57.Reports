import { useAppDispatch } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/user/userAPI';

export default function Login() {
    const dispatch = useAppDispatch();

    function handleLogIn() {
        dispatch(
            userLogInAsync({ password: 'admin1234', email: 'raff@acme.pl' })
        );
    }

    return (
        <div className="page">
            <button onClick={handleLogIn}>Login</button>
        </div>
    );
}

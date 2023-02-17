import { useAppDispatch } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/user/userAPI';
import { FormEvent } from 'react';

export default function Login() {
    const dispatch = useAppDispatch();

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(
            userLogInAsync({
                project: 'Audits',
                password: 'admin1234',
                email: 'raff@acme.pl',
            })
        );
    };

    return (
        <div className="page">
            <div className='page-content'>
                <form onSubmit={handleLogIn}>
                    <label htmlFor="fproject">Project:</label>
                    <input type="text" id="fproject" name="fproject" />
                    <label htmlFor="lemail">Email:</label>
                    <input type="email" id="lemail" name="lemail" />
                    <label htmlFor="lpassword">Password:</label>
                    <input type="password" id="lpassword" name="lpassword" />
                    <input type="submit" value="Log in" />
                </form>
            </div>
        </div>
    );
}

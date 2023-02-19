import { useAppDispatch } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/user/userAPI';
import { FormEvent } from 'react';

import style from '@/styles/login.module.css';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';

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
            <div className="page-content">
                <form className={style.loginform} onSubmit={handleLogIn}>
                    <label className={style.label} htmlFor="fproject">
                        Project:
                    </label>
                    <input
                        className={style.input}
                        type="text"
                        id="fproject"
                        name="fproject"
                    />
                    <label className={style.label} htmlFor="lemail">
                        Email:
                    </label>
                    <input
                        className={style.input}
                        type="email"
                        autoComplete="email"
                        id="lemail"
                        name="lemail"
                    />
                    <label className={style.label} htmlFor="lpassword">
                        Password:
                    </label>
                    <input
                        className={style.input}
                        type="password"
                        autoComplete="current-password"
                        id="lpassword"
                        name="lpassword"
                    />
                    <input
                        className={style.button}
                        type="submit"
                        value="Log in"
                    />

                    <Link className={style.link} href={'/login/signin'}>
                        <IconBxUserPlus width={'3rem'} height={'3rem'}/> Sign up!
                    </Link>
                    <Link className={style.link} href={'/login/reset'}>
                        <IconHeadQuestionOutline width={'3rem'} height={'3rem'}/>I forgot my password
                    </Link>
                </form>
            </div>
        </div>
    );
}

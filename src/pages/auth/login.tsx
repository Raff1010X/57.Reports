import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/auth/authAPI';
import { FormEvent, useRef } from 'react';

import style from '@/styles/login.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import React from 'react';
import IconUser from '@/assets/icons/IconUser';
import { selectAuthStatus } from '@/store/slices/auth/authSlice';
import Loader from '@/assets/icons/Loader';


export default function Login() {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);

    // const refs = new Array<MutableRefObject<HTMLInputElement>>(3).map(() => useRef<HTMLInputElement>(null));
    const refs = Array.from({ length: 3 }, () =>
        useRef<HTMLInputElement>(null)
    );

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        refs[0]?.current?.reportValidity();
        refs[1]?.current?.reportValidity();
        refs[2]?.current?.reportValidity();

        if (
            !refs[0]?.current?.checkValidity() ||
            !refs[1]?.current?.checkValidity() ||
            !refs[2]?.current?.checkValidity()
        )
            return;

        const project = refs[0]?.current?.value || '';
        const email = refs[1]?.current?.value || '';
        const password = refs[2]?.current?.value || '';

        dispatch(
            userLogInAsync({
                project,
                password,
                email,
            })
        );
    };

    return (
        <div className="page">
            <div className="page-content">
                <form className={style.loginform} onSubmit={handleLogIn}>
                    <p className={style.title}>
                        <IconUser width={'2.5rem'} height={'2.5rem'} />
                        <br />
                        Log in!
                    </p>
                    <label className={style.label} htmlFor="fproject">
                        Project name:
                    </label>
                    <input
                        ref={refs[0]}
                        className={style.input}
                        type="text"
                        id="fproject"
                        placeholder="Project"
                        required
                        minLength={3}
                        maxLength={64}
                        onChange={() => {
                            refs[0]?.current?.setCustomValidity('');
                        }}
                    />
                    <label className={style.label} htmlFor="lemail">
                        Your email:
                    </label>
                    <input
                        ref={refs[1]}
                        className={style.input}
                        type="email"
                        autoComplete="email"
                        id="lemail"
                        placeholder="Email"
                        required
                        onChange={() => {
                            refs[1]?.current?.setCustomValidity('');
                        }}
                    />
                    <label className={style.label} htmlFor="lpassword">
                        Password:
                    </label>
                    <input
                        ref={refs[2]}
                        className={style.input}
                        type="password"
                        autoComplete="current-password"
                        id="lpassword"
                        placeholder="Password"
                        required
                        minLength={8}
                        maxLength={64}
                        onChange={() => {
                            refs[2]?.current?.setCustomValidity('');
                        }}
                    />
                    <button className={style.button} type="submit">
                        {authStatus === 'idle' ? 'Log in!' : <Loader />}
                    </button>

                    <Link className={style.link} href={'/auth/signup'}>
                        <IconBxUserPlus width={'2rem'} height={'2rem'} />
                        Sign up!
                    </Link>
                    <Link className={style.link} href={'/auth/reset'}>
                        <IconHeadQuestionOutline
                            width={'2rem'}
                            height={'2rem'}
                        />
                        Forgot password?
                    </Link>
                </form>
            </div>
        </div>
    );
}

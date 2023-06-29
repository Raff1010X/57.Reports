import React from 'react';
import { selectAuthStatus } from '@/store/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userSighUpAsync } from '@/store/slices/auth/authAPI';
import { FormEvent, useRef } from 'react';
import ui from '@/styles/ui.module.sass';
import Link from 'next/link';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import Loader from '@/assets/icons/Loader';

export default function SignIn() {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);

    const refs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refs.forEach((el) => el.current?.reportValidity());
        if (refs.some((el) => !el.current?.checkValidity)) return;
        const project = refs[0]?.current?.value || '';
        const email = refs[1]?.current?.value || '';
        const password = refs[2]?.current?.value || '';
        dispatch(
            userSighUpAsync({
                project,
                password,
                email,
            })
        );
    };

    return (
        <div className="page">
            <div className="page-content">
                <form className="loginform" onSubmit={handleLogIn}>
                    <p className="title">
                        <IconBxUserPlus width={'2.5rem'} height={'2.5rem'} />
                        <br />
                        Sign up!
                    </p>
                    <label className={ui.label} htmlFor="fproject">
                        Project name:
                    </label>
                    <input
                        ref={refs[0]}
                        className={ui.input}
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
                    <label className={ui.label} htmlFor="lemail">
                        Your email:
                    </label>
                    <input
                        ref={refs[1]}
                        className={ui.input}
                        type="email"
                        autoComplete="email"
                        id="lemail"
                        placeholder="Email"
                        required
                        onChange={() => {
                            refs[1]?.current?.setCustomValidity('');
                        }}
                    />
                    <label className={ui.label} htmlFor="lpassword">
                        Password:
                    </label>
                    <input
                        ref={refs[2]}
                        className={ui.input}
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
                    <button className={ui.button} type="submit">
                        {authStatus === 'idle' ? 'Sign up!' : <Loader />}
                    </button>

                    <Link className={`${ui.link} ${ui.link_custom}`} href={'/auth/login'}>
                        <IconUser width={'2rem'} height={'2rem'} />
                        Login!
                    </Link>
                    <Link className={`${ui.link} ${ui.link_custom}`} href={'/auth/changePassword'}>
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

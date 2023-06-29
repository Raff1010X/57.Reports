import React from 'react';
import { selectAuthStatus } from '@/store/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FormEvent, useRef } from 'react';
import ui from '@/styles/ui.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import Loader from '@/assets/icons/Loader';
import { sendChangePasswordLink } from '@/store/slices/auth/authAPI';

export default function ChangePassword() {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);

    const refs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refs.forEach((el) => el.current?.reportValidity());
        if (refs.some((el) => !el.current?.checkValidity)) return;
        const email = refs[0]?.current?.value || '';
        const password = refs[1]?.current?.value || '';
        
        dispatch(
            sendChangePasswordLink({  
                email,
                password,
            })
        );

    };

    return (
        <div className="page">
            <div className="page-content">
                <form className="loginform" onSubmit={handleLogIn}>
                    <p className="title">
                        <IconHeadQuestionOutline
                            width={'2.5rem'}
                            height={'2.5rem'}
                        />
                        <br />
                        Forgot password
                    </p>
                    <label className={ui.label} htmlFor="lemail">
                        Your email:
                    </label>
                    <input
                        ref={refs[0]}
                        className={ui.input}
                        type="email"
                        autoComplete="email"
                        id="lemail"
                        placeholder="Email"
                        required
                        onChange={() => {
                            refs[0]?.current?.setCustomValidity('');
                        }}
                    />
                    <label className={ui.label} htmlFor="lpassword">
                        New password:
                    </label>
                    <input
                        ref={refs[1]}
                        className={ui.input}
                        type="password"
                        autoComplete="current-password"
                        id="lpassword"
                        placeholder="New password"
                        required
                        minLength={8}
                        maxLength={64}
                        onChange={() => {
                            refs[2]?.current?.setCustomValidity('');
                        }}
                    />
                    <button className={ui.button} type="submit">
                        {authStatus === 'idle' ? (
                            'Send me activation link'
                        ) : (
                            <Loader />
                        )}
                    </button>
                    <Link className={`${ui.link} ${ui.link_custom}`} href={'/auth/login'}>
                        <IconUser width={'2rem'} height={'2rem'} />
                        Login!
                    </Link>
                    <Link className={`${ui.link} ${ui.link_custom}`} href={'/auth/signup'}>
                        <IconBxUserPlus width={'2rem'} height={'2rem'} />
                        Sign up!
                    </Link>
                </form>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FormEvent, useRef } from 'react';
import { selectAuthStatus, userSignIn } from '@/store/slices/auth/authSlice';
import ui from '@/styles/ui.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import Loader from '@/assets/icons/Loader';

import { signIn, getSession } from 'next-auth/react';
import { showMessage } from '@/store/slices/message/messageSlice';

export default function LogIn() {
    const dispatch = useAppDispatch();
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        const element = document.getElementById('background-video');
        element?.classList.add('bgvideo_hidden');
        element?.classList.remove('bgvideo_show');
    }, []);

    const refs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refs.forEach(el => el.current?.reportValidity());
        // refs[0]?.current?.reportValidity();
        // refs[1]?.current?.reportValidity();
        // refs[2]?.current?.reportValidity();

        if (
            refs.some(el=>!el.current?.checkValidity)
            // !refs[0]?.current?.checkValidity() ||
            // !refs[1]?.current?.checkValidity() ||
            // !refs[2]?.current?.checkValidity()
        )
            return;

        const project = refs[0]?.current?.value || '';
        const email = refs[1]?.current?.value || '';
        const password = refs[2]?.current?.value || '';

        setLoading(true);
        const signInResult = await signIn('credentials', {
            redirect: false,
            project,
            email,
            password,
        });

        if (!signInResult?.ok) {
            if (signInResult?.error) dispatch(showMessage(signInResult.error));
            else dispatch(showMessage("Log in in unexpected error!"));
        } else {
            const sesion = await getSession();
            dispatch(userSignIn(sesion?.user));
        }
        setLoading(false);
    };

    return (
        <div className="page">
            <div className="page-content">
                <form className="loginform" onSubmit={handleLogIn}>
                    <p className="title">
                        <IconUser width={'2.5rem'} height={'2.5rem'} />
                        <br />
                        Login!
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
                        {!loading ? 'Log in!' : <Loader />}
                    </button>

                    <Link className={`${ui.link} ${ui.link_custom}`} href={'/auth/signup'}>
                        <IconBxUserPlus width={'2rem'} height={'2rem'} />
                        Sign up!
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

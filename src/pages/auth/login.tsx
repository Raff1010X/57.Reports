import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { FormEvent, useRef } from 'react';
import ui from '@/styles/ui.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import Loader from '@/assets/icons/Loader';

import handleSignInResponse from '@/utils/handleSignInResponse';
import { signIn } from 'next-auth/react';

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

        if (refs.some(el => !el.current?.checkValidity))
            return;

        const project = refs[0]?.current?.value || '';
        const email = refs[1]?.current?.value || '';
        const password = refs[2]?.current?.value || '';
        const options = { redirect: false, project, email, password };

        setLoading(true);
        const signInResponse = await signIn('credentials', options);
        
        const signInResult = await handleSignInResponse(signInResponse, options);
        if (signInResult) dispatch(signInResult);

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

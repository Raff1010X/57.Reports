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
import bcrypt from 'bcryptjs';
import { IUser } from '@/models/userModel';

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

        if (refs.some(el => !el.current?.checkValidity))
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
            else {
                // check if user is in local storage
                const localUser = localStorage.getItem('user');
                if (localUser) {
                    // get user from local storage
                    const hashedUser = JSON.parse(localUser);
                    // compare user email, password, project name and projectID using bcrypt.js
                    const matchEmail = await bcrypt.compare(email, hashedUser.email);
                    const matchPassword = await bcrypt.compare(password, hashedUser.password);
                    const matchProject = await bcrypt.compare(project, hashedUser.project);
                    // if all matches
                    if (matchEmail && matchPassword && matchProject) {
                        const user = {
                            email,
                            project,
                            projectID: hashedUser.projectID,
                            role: hashedUser.role
                        }
                        // save user in redux store
                        dispatch(userSignIn(user));
                    } else {
                        // if not all matches
                        dispatch(showMessage("Log in in unexpected error!"))
                    }
                }
            };
        } else {
            const sesion = await getSession() as any;
            // hash user email, password, project name and projectID using bcrypt.js
            let hashedUser;
            if (sesion?.user) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const hashedEmail = await bcrypt.hash(email, 10);
                const hashedProject = await bcrypt.hash(project, 10);
                const projectID = sesion?.user?.projectID;
                const role = sesion?.user?.role;
                hashedUser = {
                    email: hashedEmail,
                    password: hashedPassword,
                    project: hashedProject,
                    projectID,
                    role
                }
            }
            // save hashed user in local storage
            localStorage.setItem('user', JSON.stringify(hashedUser));
            // save user in redux store
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

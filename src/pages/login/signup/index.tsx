import { useAppDispatch } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/user/userAPI';
import { FormEvent, useRef } from 'react';

import style from '@/styles/login.module.sass';
import Link from 'next/link';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import React from 'react';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';

export default function SignIn() {
    const dispatch = useAppDispatch();

    // const refs = new Array<MutableRefObject<HTMLInputElement>>(3).map(() => useRef<HTMLInputElement>(null));
    const refs = Array.from({ length: 3 }, () =>
        useRef<HTMLInputElement>(null)
    );

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(refs[0]?.current?.value);
        console.log(refs[1]?.current?.value);
        console.log(refs[2]?.current?.value);

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
                    <p className={style.title}><IconBxUserPlus width={'2.5rem'} height={'2.5rem'} /><br/>Sign up!</p>
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
                    <input
                        className={style.button}
                        type="submit"
                        value="Sign up!"
                    />

                    <Link className={style.link} href={'/login'}>
                        <IconUser width={'2rem'} height={'2rem'} />
                        Log in!
                    </Link>
                    <Link className={style.link} href={'/login/reset'}>
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

import React from 'react';
import { selectAuthStatus } from '@/store/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/auth/authAPI';
import { FormEvent, useRef } from 'react';
import style from '@/styles/pages/login.module.sass';
import ui from '@/styles/interface/ui.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import IconUser from '@/assets/icons/IconUser';
import Loader from '@/assets/icons/Loader';

export default function Reset() {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);

    // const refs = new Array<MutableRefObject<HTMLInputElement>>(3).map(() => useRef<HTMLInputElement>(null));
    // const refs = Array.from({ length: 3 }, () =>
    //     useRef<HTMLInputElement>(null)
    // );
    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        refs[0]?.current?.reportValidity();

        if (!refs[0]?.current?.checkValidity()) return;

        const email = refs[0]?.current?.value || '';

        // dispatch(
        //     userLogInAsync({
        //         email,
        //     })
        // );
    };

    return (
        <div className="page">
            <div className="page-content">
                <form className={style.loginform} onSubmit={handleLogIn}>
                    <p className={style.title}><IconHeadQuestionOutline width={'2.5rem'} height={'2.5rem'} /><br/>Forgot password</p>
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
                    <button
                        className={ui.button}
                        type="submit"
                    >
                        {(authStatus==="idle") ? "Send password!" : <Loader/>}
                    </button>
                    <Link className={ui.link} href={'/auth/login'}>
                        <IconUser width={'2rem'} height={'2rem'} />
                        Log in!
                    </Link>
                    <Link className={ui.link} href={'/auth/signup'}>
                        <IconBxUserPlus width={'2rem'} height={'2rem'} />
                        Sign up!
                    </Link>
                </form>
            </div>
        </div>
    );
}

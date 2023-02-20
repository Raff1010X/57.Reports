import { useAppDispatch } from '@/store/hooks';
import { userLogInAsync } from '@/store/slices/user/userAPI';
import { FormEvent, useRef } from 'react';

import style from '@/styles/login.module.sass';
import Link from 'next/link';
import IconBxUserPlus from '@/assets/icons/IconBxUserPlus';
import IconHeadQuestionOutline from '@/assets/icons/IconHeadQuestionOutline';
import React from 'react';
import IconUser from '@/assets/icons/IconUser';

export default function Reset() {
    const dispatch = useAppDispatch();

    // const refs = new Array<MutableRefObject<HTMLInputElement>>(3).map(() => useRef<HTMLInputElement>(null));
    const refs = Array.from({ length: 3 }, () =>
        useRef<HTMLInputElement>(null)
    );

    const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(refs[0]?.current?.value);

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
                    <input
                        className={style.button}
                        type="submit"
                        value="Send new password"
                    />
                    <Link className={style.link} href={'/login'}>
                        <IconUser width={'2rem'} height={'2rem'} />
                        Log in!
                    </Link>
                    <Link className={style.link} href={'/login/signup'}>
                        <IconBxUserPlus width={'2rem'} height={'2rem'} />
                        Sign up!
                    </Link>
                </form>
            </div>
        </div>
    );
}

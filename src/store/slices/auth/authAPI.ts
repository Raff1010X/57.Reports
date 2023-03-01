import { logIn, logOut } from '@/data/dumy-data';

import { IUser } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userSighUpAsync = createAsyncThunk(
    'auth/fetchSignUp',
    async (data: IUser) => {
        const response = await fetch('/api/auth/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    }
);

export const userLogInAsync = createAsyncThunk(
    'auth/fetchLogIn',
    async (data: IUser) => {
        const response = await logIn(data);
        return response;
    }
);

export const userLogOutAsync = createAsyncThunk(
    'auth/fetchLogOut',
    async () => {
        const response = await logOut();
        return response;
    }
);

import { logIn, logOut } from '@/data/dumy-data';
import { IUser } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '@/utils/API'

export const userSighUpAsync = createAsyncThunk(
    'auth/fetchSignUp',
    async (data: IUser) => {
        const response = await API.makeGet('/api/auth/signup', data)
        return response;
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

import { logIn, logOut } from '@/data/dumy-data';

import { IUser } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

import { logIn, logOut } from '@/data/dumy-data';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    email: string;
    password: string;
}

export const userLogInAsync = createAsyncThunk(
    'user/fetchLogIn',
    async (data: User) => {
        const response = await logIn(data);
        return response;
    }
);

export const userLogOutAsync = createAsyncThunk(
    'user/fetchLogOut',
    async () => {
        const response = await logOut();
        return response;
    }
);

import { logIn, logOut } from '@/data/dumy-data';

import { SuperUser } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userLogInAsync = createAsyncThunk(
    'user/fetchLogIn',
    async (data: SuperUser) => {
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

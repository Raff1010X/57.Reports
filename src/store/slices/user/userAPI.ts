import { login } from '@/data/dumy-data';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    email: string;
    password: string;
}

export const userLogInAsync = createAsyncThunk(
    'user/fetchLogin',
    async (data: User) => {
        const response = await login(data);
        return response;
    }
);

import { logIn, logOut } from '../../../utils/data/dumy-data';
import { IUser } from '../../../models/userModel';
import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../../utils/API'

export const userSighUpAsync = createAsyncThunk(
    'auth/fetchSignUp',
    async (data: IUser) => {
        const response = await API.makePost('/api/auth/signup', data)
        return response;
    }
);

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

export const sendChangePasswordLink = createAsyncThunk(
    'auth/fetchSendChangePasswordLink',
    async (data: IUser) => {
        const response = await API.makePost('/api/auth/changePassword', data)
        return response;
    }
);

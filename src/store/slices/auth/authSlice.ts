import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../store';

import { userSighUpAsync, sendChangePasswordLink } from './authAPI';
import Router from 'next/router';
import { showMessage } from '../message/messageSlice';

export type TUserState = {
    status: string;
    user: {
        project: string;
        email: string;
        role: string;
    };
};

const initialState: TUserState = {
    status: 'idle',
    user: { project: '', email: '', role: '' },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userSignOut: (state) => {
            state.user = { ...initialState.user };
        },
        userSignIn: (state, action) => {
            state.user = { ...action.payload };
            Router.push('/');
        }
    },
    extraReducers: (builder) => {
        builder
            // sign up
            .addCase(userSighUpAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userSighUpAsync.fulfilled, (state, action: any) => {
                state.status = 'idle';
                if (action.payload.message.indexOf("error") > 0) action.asyncDispatch(showMessage('Sign up unexpeted error!'))
                else
                    action.asyncDispatch(showMessage(action.payload.message))
            })
            .addCase(userSighUpAsync.rejected, (state, action: any) => {
                state.status = 'failed';
                state.user = initialState.user;
                action.asyncDispatch(showMessage(action.payload.message))
            })
            // change password
            .addCase(sendChangePasswordLink.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendChangePasswordLink.fulfilled, (state, action: any) => {
                state.status = 'idle';
                if (action.payload.message.indexOf("error") > 0) action.asyncDispatch(showMessage('Change password unexpeted error!'))
                else
                    action.asyncDispatch(showMessage(action.payload.message))
            })
            .addCase(sendChangePasswordLink.rejected, (state, action: any) => {
                state.status = 'failed';
                state.user = initialState.user;
                action.asyncDispatch(showMessage(action.payload.message))
            })
    },
});

export const { userSignOut, userSignIn } = authSlice.actions;

export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectIsUserLogged = (state: AppState) => state.auth.user.email !== '' ? true : false;
export const selectUser = (state: AppState) => state.auth.user;

export const selectIsSuperUser = (state: AppState) => state.auth.user.role === 'superUser' || state.auth.user.role === 'admin' ? true : false;


export default authSlice.reducer;

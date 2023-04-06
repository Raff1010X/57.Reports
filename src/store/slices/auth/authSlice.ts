import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../store';

import { userSighUpAsync } from './authAPI';
import Router from 'next/router';
import { showMessage } from '../message/messageSlice';

export type TUserState = {
    status: string;
    user: {
        project: string;
        email: string;
        department: string;
        isLoged: boolean;
        role: string;
    };
};

const initialState: TUserState = {
    status: 'idle',
    user: { project: '', email: '', department: '', role: '', isLoged: false },
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
                action.asyncDispatch(showMessage(action.payload.message))
            })
            .addCase(userSighUpAsync.rejected, (state, action: any) => {
                state.status = 'failed';
                state.user = initialState.user;
                action.asyncDispatch(showMessage(action.payload.message))
            })
    },
});

export const { userSignOut, userSignIn } = authSlice.actions;

export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectIsUserLogged = (state: AppState) => state.auth.user.isLoged;
export const selectUser = (state: AppState) => state.auth.user;
export const selectIsSuperUser = (state: AppState) => {
    const isSuperUser = state.auth.user.role === 'superUser' ? true : false;
    return isSuperUser;
};

export default authSlice.reducer;

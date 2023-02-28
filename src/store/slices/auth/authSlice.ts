import { IUser, TUserState } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { userLogInAsync, userLogOutAsync } from './authAPI';
import Router from 'next/router';
import { showMessage } from '../message/messageSlice';

const initialState: TUserState = {
    status: 'idle',
    user: { project: '', email: '', department: '', role: '', isLoged: false },
    loggedOut: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedOut: (state) => {
            state.loggedOut = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // log in
            .addCase(userLogInAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogInAsync.fulfilled, (state, action: IUser | any) => {
                state.status = 'idle';
                if (action.payload.status === 'success') {
                    state.user = { ...action.payload.user }
                    Router.push('/')
                } else {
                    action.asyncDispatch(showMessage(action.payload.message))
                }
            })
            .addCase(userLogInAsync.rejected, (state) => {
                state.status = 'failed';
                state.user = initialState.user;
            })
            // log out
            .addCase(userLogOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.status === 'success') {
                    state.user = { ...action.payload.user };
                }
            })
            .addCase(userLogOutAsync.rejected, (state) => {
                state.status = 'failed';
                state.user = initialState.user;
            });
    },
});

export const { setLoggedOut } = authSlice.actions;

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsUserLogged = (state: RootState) => state.auth.user.isLoged;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoggedOut = (state: RootState) => state.auth.loggedOut;
export const selectIsSuperUser = (state: RootState) => {
    const isSuperUser = state.auth.user.role ==='superUser' ? true : false;
    return isSuperUser
};

export default authSlice.reducer;

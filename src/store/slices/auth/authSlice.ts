import { UserState } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { userLogInAsync, userLogOutAsync } from './authAPI';
import router from 'next/router';

const initialState: UserState = {
    status: 'idle',
    user: { project: '', email: '', department: '', role: '', isLoged: false },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // log in
            .addCase(userLogInAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogInAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.status === 'success') {
                    state.user = { ...action.payload.user };
                    console.log(state.user)
                    router.push('/')
                } else {
                    console.log('not valid user')
                }
            })
            .addCase(userLogInAsync.rejected, (state) => {
                state.status = 'failed';
                state.user = initialState.user;
                console.log('failed')
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

export const { setUserEmail } = authSlice.actions;

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsUserLogged = (state: RootState) => state.auth.user.isLoged;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

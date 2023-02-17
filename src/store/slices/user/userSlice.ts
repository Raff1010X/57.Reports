import { UserState } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { userLogInAsync, userLogOutAsync } from './userAPI';

const initialState: UserState = {
    status: 'idle',
    user: { project: '', email: '', role: '', isLoged: false },
};

export const userSlice = createSlice({
    name: 'user',
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

export const { setUserEmail } = userSlice.actions;

export const selectIsUserLogged = (state: RootState) => state.user.user.isLoged;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

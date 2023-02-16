import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { userLogInAsync } from './userAPI';

type UserState = {
    status: string;
    user: {
        email: string;
        isLoged: boolean;
        role: string;
    };
};

const initialState: UserState = {
    status: 'idle',
    user: { email: '', role: '', isLoged: false },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
        logOut: (state) => {
            state.status = 'idle';
            state.user = initialState.user;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogInAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogInAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload.status === 'success') {
                    state.user = { ...state.user, ...action.payload.user };
                }
            })
            .addCase(userLogInAsync.rejected, (state) => {
                state.status = 'failed';
                state.user = initialState.user;
            });
    },
});

export const { setUserEmail, logOut } = userSlice.actions;

export const selectIsUserLogged = (state: RootState) => state.user.user.isLoged;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

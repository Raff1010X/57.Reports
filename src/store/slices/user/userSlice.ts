import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type UserState = {
    isLoged: boolean;
};

const initialState: UserState = {
    isLoged: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsUserLogged: (state, action: PayloadAction<boolean>) => {
            state.isLoged = action.payload;
        },
    },
});

export const { setIsUserLogged } = userSlice.actions;

export const selectIsUserLogged = (state: RootState) => state.user.isLoged;

export default userSlice.reducer;

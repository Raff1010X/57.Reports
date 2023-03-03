import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';

const initialState = {
    message: '',
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        hideMessage: (state) => {
            state.message = '';
        },
    },
});

export const { showMessage, hideMessage } = messageSlice.actions;

export const selectMessage = (state: AppState) => state.message.message;

export default messageSlice.reducer;

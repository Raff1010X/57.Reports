
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefObject, useRef } from 'react';
import { RootState } from '../../store';

const initialState = {
    message: ''
};


function showMessage(reff: RefObject<HTMLDivElement>) {
    reff?.current?.classList.add("message--visible")
}

function hideMessage(reff: RefObject<HTMLDivElement>) {
    reff?.current?.classList.remove("message--visible")
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<{message: string; reff: RefObject<HTMLDivElement>}>) => {
            state.message = action.payload.message;
            if (action.payload.message !== "") {
                showMessage(action.payload.reff);
            }
            else {
                hideMessage(action.payload.reff);
            }
            
        },
    },
});

export const { setMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message.message;

export default messageSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import asyncDispatchMiddleware from './asyncDispatchMiddleware';
import authReducer from './slices/auth/authSlice';
import messageReducer from './slices/message/messageSlice';

const reducer = {
    auth: authReducer,
    message: messageReducer,
};

const makeStore = () =>
    configureStore({
        reducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(asyncDispatchMiddleware),
            //     getDefaultMiddleware({
            //     serializableCheck: {
            //         ignoredActions: ['message/setMessage'],
            //     },
            // }).concat(asyncDispatchMiddleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

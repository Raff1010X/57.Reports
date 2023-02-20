import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import asyncDispatchMiddleware from './asyncDispatchMiddleware';

import authReducer from './slices/auth/authSlice';
import messageReducer from './slices/message/messageSlice';

const reducer = {
    auth: authReducer,
    message: messageReducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['message/setMessage'],
            },
        }).concat(asyncDispatchMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

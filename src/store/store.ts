import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import asyncDispatchMiddleware from './asyncDispatchMiddleware';

import userReducer from './slices/user/userSlice';

const reducer = {
    user: userReducer,
};

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(asyncDispatchMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

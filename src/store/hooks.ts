import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
  } from 'react-redux';
  import type {
    AppState,
  } from './store';
  
  export const useAppDispatch = () => useDispatch<Dispatch<AnyAction>>();
  export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
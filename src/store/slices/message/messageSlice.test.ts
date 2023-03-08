
import { configureStore } from '@reduxjs/toolkit';
import messageReducer, { showMessage, hideMessage, selectMessage } from './messageSlice';

describe('messageSlice', () => {
  let store = configureStore({
      reducer: {
        message: messageReducer,
      },
    });


  it('should show message correctly', () => {
    store.dispatch(showMessage('Hello World!'));

    const state = store.getState().message;

    // expect(selectMessage(store.getState())).toBe('Hello World!');
    expect(state.message).toBe('Hello World!');
  });

  it('should hide message correctly', () => {
    store.dispatch(hideMessage());
    const state = store.getState().message;
    // expect(selectMessage(store.getState())).toBe('');
    expect(state.message).toBe('');
  });
});


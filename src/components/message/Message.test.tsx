import {
    render,
    screen,
    fireEvent,
    act,
    waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Message from './Message';
import { hideMessage, showMessage } from '@/store/slices/message/messageSlice';
import messageReducer from '@/store/slices/message/messageSlice';
import '@testing-library/jest-dom';

describe('Message component', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                message: messageReducer,
            },
        });
    });

    it('renders nothing when there is no message', () => {
        render(
            <Provider store={store}>
                <Message />
            </Provider>
        );

        expect(screen.queryByRole('button')).toBeNull();
    });

    it('renders a message box and button when there is a message', () => {
        const message = 'Test message';
        store.dispatch(showMessage(message));

        render(
            <Provider store={store}>
                <Message />
            </Provider>
        );

        const okButton = screen.getByRole('button', { name: 'Ok' });
        expect(okButton).not.toBeNull();
        expect(okButton).toBeVisible();

        const messageText = screen.getByText(message);
        expect(messageText).toBeInTheDocument();
    });

    it('hides the message box when clicking the OK button', async () => {
        const message = 'Test message';
        store.dispatch(showMessage(message));

        render(
            <Provider store={store}>
                <Message />
            </Provider>
        );

        const okButton = screen.getByRole('button', { name: 'Ok' });
        expect(okButton).not.toBeNull();
        expect(okButton).toBeVisible();

        const messageText = screen.getByText(message);
        expect(messageText).toBeInTheDocument();

        act(() => {
            // store.dispatch(hideMessage());
            fireEvent.click(okButton);
        });

        await waitFor(() => {
            expect(screen.queryByRole('button', { name: 'Ok' })).toBeNull();
        });

        const messageBox = screen.queryByTestId('messagebox');
        expect(messageBox).toBeNull();
        const messageState = (
            store.getState() as {
                message: string;
            }
        ).message;
        expect(messageState).toStrictEqual({ message: '' });
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackgroundVideo from './BackgroundVideo';
import '@testing-library/jest-dom';

// mock the next/router module
const replace = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => replace),
}));

// mock the useSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => true),
    useDispatch: jest.fn(() => {return}),
}));

describe('BackgroundVideo component when user is logged', () => {

    it('do not display video when user is logged', () => {
        render(<BackgroundVideo />);
        // act
        const videoElement = screen.queryByTestId('video');
        // assert
        expect(videoElement).toBeNull();
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackgroundVideo from './BackgroundVideo';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

// mock the next/router module
const replace = jest.fn();
jest.mock('next/router', () => ({
    useRouter: jest.fn(() => replace),
}));

// mock the useSelector hook
// jest.mock('react-redux', () => ({
//     useSelector: jest.fn(() => {
//         selectIsUserLogged: jest.fn(() => {
//             return false;
//         });
//         selectLoggedOut: jest.fn(() => {
//             return false;
//         });
//     }),
// }));
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => false),
}));

describe('BackgroundVideo component', () => {
    // render before each test
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValueOnce({
            replace,
        });
        render(<BackgroundVideo />);
    });

    it('renders video element correctly', () => {
        // act
        const videoElement = screen.getByTestId('video');
        // assert
        expect(videoElement).toBeInTheDocument();
        expect(videoElement.className).toBe('video');
        expect(videoElement).toHaveAttribute('playsInline');
        expect(videoElement).toHaveAttribute('autoPlay');
        expect(videoElement).toHaveAttribute('loop');
        expect(videoElement).toHaveAttribute('preload', 'auto');
        expect(videoElement.querySelector('source')).toHaveAttribute(
            'src',
            '/pexels-koolshooters-6980918.webm'
        );
        expect(videoElement.querySelector('source')).toHaveAttribute(
            'type',
            'video/webm'
        );
    });

    it('renders content correctly', () => {
        // act
        const titleElement = screen.getByText(/report creator/i);
        const textElement = screen.getByText(/create audit reports/i);
        const loginButtonElement = screen.getByText(/login/i);
        const iconElement = screen.getByTestId('icon');
        // assert
        expect(titleElement).toBeInTheDocument();
        expect(textElement).toBeInTheDocument();
        expect(loginButtonElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass('icon-shadow');
        expect(iconElement).toHaveAttribute('width', '10rem');
        expect(iconElement).toHaveAttribute('height', '10rem');
        expect(loginButtonElement).toHaveClass('bgvideo-button');
    });

    it('redirects to /auth/login when clicking login button', () => {
        // act
        const loginButtonElement = screen.getByRole('button');
        fireEvent.click(loginButtonElement);

        // assert
        expect(replace).toHaveBeenCalledWith('/auth/login');
        expect(replace).toHaveBeenCalledTimes(1);
    });
});
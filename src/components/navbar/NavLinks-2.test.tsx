import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLinks from './NavLinks';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: () => ({ pathname: '/current/path' }),
}));

// mock the useAppSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => false),
    useDispatch: jest.fn(() => {return}),
}));

describe('NavLinks component', () => {
    it('does not display links when isUserLogged is false', () => {
        render(<NavLinks handleClick={() => {}} />);
        const links = screen.queryAllByRole('link');
        const link = screen.getByText(/login/i);
        expect(links).toHaveLength(1);
        expect(link).toBeInTheDocument();
    });
});

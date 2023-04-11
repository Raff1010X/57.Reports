import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLinks from './NavLinks';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: () => ({ pathname: '/current/path' }),
}));

// mock the useSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => false),
    useDispatch: jest.fn(() => {return}),
}));

describe('NavLinks component', () => {
    it('does not display links when isUserLogged is false', async () => {
        render(<NavLinks handleClick={() => {}} />);
        const links = await screen.queryAllByRole('link');
        const link = await screen.getByText(/login/i);
        expect(links).toHaveLength(1);
        expect(link).toBeInTheDocument();
    });
});

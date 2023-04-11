import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLinks from './NavLinks';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: () => ({ pathname: '/current/path' }),
}));

// mock the useSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => true),
    useDispatch: jest.fn(() => {return}),
}));

describe('NavLinks component', () => {
    it('does not display links when isUserLogged is false', async () => {
        render(<NavLinks handleClick={() => {}} />);
        const links = await screen.queryAllByRole("link");
        expect(links).toHaveLength(4);
    });

});

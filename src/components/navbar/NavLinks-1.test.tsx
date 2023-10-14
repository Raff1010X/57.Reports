import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLinks from './NavLinks';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: () => ({ pathname: '/current/path' }),
}));

// mock the useAppSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => true),
    useDispatch: jest.fn(() => {return}),
}));

describe('NavLinks component', () => {
    it('does not display links when isUserLogged is false', () => {
        render(<NavLinks handleClick={() => {}} />);
        const links = screen.queryAllByRole("link");
        expect(links).toHaveLength(4);
    });

});

import { render, screen, fireEvent } from '@testing-library/react';
import NavLink from './NavLink';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: () => ({ pathname: '/current/path' }),
}));

describe('NavLink', () => {
    const handleClick = jest.fn();
    const icon = () => <svg />;

    it('renders a link with the expected properties', () => {
        const props = {
            linkTo: '/some/path',
            text: 'Link text',
            icon,
            className: 'test-class',
            handleClick,
        };
        render(<NavLink {...props} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/some/path');
        expect(link).toHaveClass('test-class');
        expect(screen.getByText('Link text')).toBeInTheDocument();
    });

    it('renders a link with the expected props without className', () => {
        const props = {
            linkTo: '/some/path',
            text: 'Link text',
            icon,
            handleClick,
        };
        render(<NavLink {...props} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/some/path');
        expect(link).toHaveClass('link');
        expect(screen.getByText('Link text')).toBeInTheDocument();
    });

    it('renders a link with the expected props with link--active className', () => {
        const props = {
            linkTo: '/current/path',
            text: 'Link text',
            icon,
            handleClick,
        };
        render(<NavLink {...props} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/current/path');
        expect(link).toHaveClass('link--active');
        expect(screen.getByText('Link text')).toBeInTheDocument();
    });

    it('calls handleClick when the link is clicked', () => {
        const props = {
            linkTo: '/some/path',
            text: 'Link text',
            icon,
            handleClick,
        };
        render(<NavLink {...props} />);
        const link = screen.getByRole('link');
        fireEvent.click(link);
        expect(handleClick).toHaveBeenCalled();
      });

});

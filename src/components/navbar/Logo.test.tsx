import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';
import { useAppSelector } from '../../store/hooks';

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

describe('Logo', () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReturnValue(true);
  });

  it('renders the component with correct link when user is logged in', () => {
    render(<Logo menuActive={false} handleClick={() => {}} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Report creator')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-icon')).toBeInTheDocument();
  });

  it('renders the component with correct link when user is not logged in', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);
    render(<Logo menuActive={false} handleClick={() => {}} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/auth/login');
    expect(screen.getByText('Report creator')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-icon')).toBeInTheDocument();
  });

  it('handles click event correctly when menu is active', () => {
    const fakeClickHandler = jest.fn();
    render(<Logo menuActive={true} handleClick={fakeClickHandler} />);
    const link = screen.getByRole('link');
    link.click();
    expect(fakeClickHandler).toHaveBeenCalledTimes(1);
  });
});

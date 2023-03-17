import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Theme from './Theme';

describe('Theme', () => {
  it('should toggle between light and dark theme on icon click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Theme handleClick={handleClick} />);
    const iconSun = getByTestId('theme-icon');

    // Check initial theme state
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('report-theme')).toBe('light')

    fireEvent.click(iconSun);

    // Check if click event was called
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Check updated theme state after click
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('report-theme')).toBe('dark')

    const iconMoon = getByTestId('theme-icon');
    fireEvent.click(iconMoon);

    // Check if click event was called
    expect(handleClick).toHaveBeenCalledTimes(2);

    // Check updated theme state after second click
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('report-theme')).toBe('light')
  });
});

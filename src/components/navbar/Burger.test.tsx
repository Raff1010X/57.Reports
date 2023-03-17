import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Burger from './Burger';

describe('Burger', () => {
  it('render the hamburger icon by default', () => {
    render(<Burger menuActive={false} handleClick={() => console.log('click')} />);
    const hamburgerIcon = screen.getByTestId('hamburger-icon');
    expect(hamburgerIcon).toBeInTheDocument();
    const closeIcon = screen.queryByTestId('close-icon');
    expect(closeIcon).toBeNull();
  });

  it('render the close icon when menuActive is true', () => {
    render(<Burger menuActive={true} handleClick={() => console.log('click')} />);
    const closeIcon = screen.getByTestId('close-icon');
    expect(closeIcon).toBeInTheDocument();
    const hamburgerIcon = screen.queryByTestId('hamburger-icon');
    expect(hamburgerIcon).toBeNull();
  });
});

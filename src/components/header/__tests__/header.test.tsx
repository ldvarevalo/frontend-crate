import { render, screen } from '@test-utils';
import { Header } from '../header';

/**
 * Header
 */

describe('Header', () => {
  it('should render logo link', () => {
    render(<Header />);

    expect(screen.getByText('Crate')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('should render logout link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Log out' })).toBeInTheDocument();
  });
});

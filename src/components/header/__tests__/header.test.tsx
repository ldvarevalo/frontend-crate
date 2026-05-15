import { render, routerMock, screen } from '@test-utils';
import { Header } from '../header';

/**
 * Header
 */

describe('Header', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should render logo link', () => {
    render(<Header />);

    expect(screen.getByText('Crate')).toBeInTheDocument();
    expect(document.body).toMatchSnapshot();
  });

  it('should render navigation links when authenticated on auth route', async () => {
    localStorage.setItem('is_authenticated', 'true');

    await routerMock.navigate({ to: '/inicio' });

    render(<Header />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Collection' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add' })).toBeInTheDocument();
  });
});

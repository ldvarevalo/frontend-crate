import { render, screen } from '@test-utils';
import { AlbumHero, type AlbumHeroProps } from '../album-hero';

const defaultProps: AlbumHeroProps = {
  coverUrl: 'https://example.com/cover.jpg',
  title: 'A Love Supreme',
  artist: 'John Coltrane',
};

describe('AlbumHero (detail variant)', () => {
  it('should render title and artist', () => {
    render(<AlbumHero {...defaultProps} />);

    expect(screen.getByText('A Love Supreme')).toBeInTheDocument();
    expect(screen.getByText('John Coltrane')).toBeInTheDocument();
  });

  it('should render image with coverUrl', () => {
    render(<AlbumHero {...defaultProps} />);

    const img = screen.getByAltText('A Love Supreme');

    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('should render gradient overlay in detail variant', () => {
    const { container } = render(<AlbumHero {...defaultProps} />);

    expect(container.querySelector('.bg-gradient-to-t')).toBeInTheDocument();
  });
});

describe('AlbumHero (cover variant)', () => {
  it('should render title and artist', () => {
    render(<AlbumHero {...defaultProps} variant="cover" />);

    expect(screen.getByText('A Love Supreme')).toBeInTheDocument();
    expect(screen.getByText('John Coltrane')).toBeInTheDocument();
  });

  it('should render image with coverUrl', () => {
    render(<AlbumHero {...defaultProps} variant="cover" />);

    const img = screen.getByAltText('A Love Supreme');

    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg');
  });

  it('should not render gradient overlay in cover variant', () => {
    const { container } = render(
      <AlbumHero {...defaultProps} variant="cover" />
    );

    expect(
      container.querySelector('.bg-gradient-to-t')
    ).not.toBeInTheDocument();
  });

  it('should render h1 in cover variant', () => {
    render(<AlbumHero {...defaultProps} variant="cover" />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent('A Love Supreme');
  });
});

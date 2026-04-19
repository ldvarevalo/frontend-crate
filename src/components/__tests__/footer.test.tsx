import { render, screen } from '@test-utils'
import { Footer } from '../footer'

/**
 * Footer
 */

describe('Footer', () => {
  it('should render copyright with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('should render built with text', () => {
    render(<Footer />)
    expect(screen.getByText('Built with TanStack Start')).toBeInTheDocument()
  })

  it('should render X link', () => {
    render(<Footer />)
    const xLink = screen.getByRole('link', { name: /follow tanstack on x/i })
    expect(xLink).toHaveAttribute('href', 'https://x.com/tan_stack')
  })

  it('should render GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /go to tanstack github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/TanStack')
  })
})
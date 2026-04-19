import { render, screen } from '@test-utils'
import { Header } from '../header'

/**
 * Header
 */

describe('Header', () => {
  it('should render logo link', () => {
    render(<Header />)
    expect(screen.getByText('TanStack Start')).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument()
  })

  it('should render social links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /follow tanstack on x/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to tanstack github/i })).toBeInTheDocument()
  })
})
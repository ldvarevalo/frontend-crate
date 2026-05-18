import { render, screen } from '@test-utils';
import { Input } from '../input';

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should pass value and onChange', () => {
    const onChange = vi.fn();
    render(<Input value="hello" onChange={onChange} />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('should render placeholder', () => {
    render(<Input placeholder="Type here..." />);
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument();
  });
});

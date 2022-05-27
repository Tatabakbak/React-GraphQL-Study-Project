import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('Renders properly', () => {
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container, debug } = render(<CartCount count={10} />);
    expect(container).toMatchSnapshot();
  });
  it('Updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={12} />);
    expect(container).toHaveTextContent('12');
    // vanillaJs-style approach:
    // expect(container.textContent).toBe('12');

    // pass new props via rerender
    rerender(<CartCount count={13} />);
    // wait for 400 ms - waititng for transition to end
    await wait(400);
    // await screen.findByText('13');
    expect(container).toHaveTextContent('13');
    expect(container).toMatchSnapshot();
  });
});

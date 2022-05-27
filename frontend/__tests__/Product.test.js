import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

const product = fakeItem();

describe('<Product/>', () => {
  it('Renders out the price tag in the title', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider>
          <Product product={product} />
        </MockedProvider>
      </CartStateProvider>
    );
    // debug();
    const priceTag = screen.getByText('$50');
    expect(priceTag).toBeInTheDocument();

    const link = container.querySelector('a');
    // debug(link);
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });

  it('Renders and matches a snapshot', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider>
          <Product product={product} />
        </MockedProvider>
      </CartStateProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Renders the image properly', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider>
          <Product product={product} />
        </MockedProvider>
      </CartStateProvider>
    );
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});

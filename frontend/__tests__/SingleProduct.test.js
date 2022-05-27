import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SingleProduct, {
  SINGLE_PRODUCT_QUERY,
} from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

const mocks = [
  {
    // When someone requests this query and variable combo
    request: {
      query: SINGLE_PRODUCT_QUERY,
      variables: {
        id: '123',
      },
    },
    // Return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: SINGLE_PRODUCT_QUERY,
      variables: {
        id: '123',
      },
    },
    result: {
      errors: [{ message: 'Item not found!' }],
    },
  },
];

describe('<Single Product/>', () => {
  it('renders with proper data', async () => {
    // We need to make some fake data
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // Wait for the test ID to show up
    await screen.findByTestId('singleProduct');
    // debug();
    expect(container).toMatchSnapshot();
  });

  it('Errors out when item is not found', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={errorMocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    await screen.findByTestId('graphql-error');
    // debug();
    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!');
  });
});

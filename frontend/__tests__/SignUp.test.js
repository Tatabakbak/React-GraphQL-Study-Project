import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();
const password = 'wes';
const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: user.email,
          name: user.name,
        },
      },
    },
  },
];

describe('<SignUp/>', () => {
  it('render and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), user.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), user.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    // Click the submit
    await userEvent.click(screen.getByText('Sign Up'));
    await screen.findByText(
      `Successfully signed up with ${user.email} - please sign in`
    );
  });
});

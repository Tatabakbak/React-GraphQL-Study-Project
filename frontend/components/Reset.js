import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      #code and message returned if there was error
      #but with new version of 'keystone-next' it was replaced
      #now it always returns null
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { loading, data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const resetError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Set new password</h2>
      <DisplayError error={error || resetError} />
      <fieldset
        disabled={loading && !error && !resetError}
        aria-busy={loading && !error && !resetError}
      >
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}

        <label htmlFor="r_email">
          Email
          <input
            id="r_email"
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="r_password">
          Password
          <input
            id="r_password"
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save changes</button>
      </fieldset>
    </Form>
  );
}

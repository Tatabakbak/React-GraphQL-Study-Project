import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { error, loading, data }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch((err) => console.error(err));
    resetForm();
  }

  return (
    // method="POST" proves that sensible information doesn't go to browser history or server logs
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Create new account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading && !error} aria-busy={loading && !error}>
        {data?.createUser && (
          <p>
            Successfully signed up with {data.createUser.email} - please sign in
          </p>
        )}
        <label htmlFor="new_name">
          Name
          <input
            id="new_name"
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="new_email">
          Email
          <input
            id="new_email"
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="new_password">
          Password
          <input
            id="new_password"
            type="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}

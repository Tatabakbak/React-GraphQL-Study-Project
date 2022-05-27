import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Router } from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { SINGLE_PRODUCT_QUERY } from './SingleProduct';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int # $image: Upload
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        description: $description
        price: $price
        #status: "AVAILABLE"
        #photo: { update: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  if (loading) return <div>loading...</div>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        });
        // clearForm();
        // go to products page
        // Router.push({ pathname: `/product/${res.data.updateProduct.id}}` });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>

        {/* <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button> */}
      </fieldset>
    </Form>
  );
}

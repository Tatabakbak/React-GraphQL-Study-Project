import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATUON = gql`
  mutation ADD_TO_CART_MUTATUON($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const { openCart } = useCart();
  const [addToCart, { loading, error, data }] = useMutation(
    ADD_TO_CART_MUTATUON,
    {
      variables: { id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  function handleClick() {
    addToCart();
    openCart();
  }

  return (
    <button type="button" onClick={handleClick} disabled={loading}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}

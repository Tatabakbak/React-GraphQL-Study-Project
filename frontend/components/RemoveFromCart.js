import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  // apollo cache
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }], --> update function is used instead
    update,
    /* optimisticResponse: { ---> not working
      deleteCartItem: {
        _typename: 'CartItem',
        id,
      },
    }, */
  });

  return (
    <BigButton
      type="button"
      title="remove from cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

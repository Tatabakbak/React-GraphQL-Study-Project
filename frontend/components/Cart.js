import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import CartItem from './CartItem';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';
import { Checkout } from './Checkout';

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!user) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>

      <ul style={{ overflowX: 'hidden' }}>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

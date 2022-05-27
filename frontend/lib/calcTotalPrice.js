export default function calcTotalPrice(cart) {
  return cart.reduce((total, cartItem) => {
    if (!cartItem.product) return total; // product can be deleted but still be in a cart
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);
}

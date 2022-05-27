/*eslint-disable*/
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // query current user - check if signed in
  const session = context.session as Session;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // query current user's cart
  // check if product with same id is already in the cart, if so - increase quantity, else - create new
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });

  const [existingCartItem] = allCartItems; // take first
 
  if (existingCartItem) {
    // increment quantity
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
       resolveFields: false
    });
  }

  // create new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } }
    },
  });
}

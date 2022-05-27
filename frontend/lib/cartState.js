import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
}

// custom hook to access the cart local state
function useCart() {
  // use consumer to access to local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };

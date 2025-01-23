import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  // 1. '' - DEFAULT state
  // 2. 'CART' - state when the cart is shown.
  // 3. 'CHECKOUT' - state when the checkout is shown.
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  const showCart = () => {
    setUserProgress('CART');
  };

  const hideCart = () => {
    setUserProgress('');
  };

  const showCheckout = () => {
    setUserProgress('CHECKOUT');
  };

  const hideCheckout = () => {
    setUserProgress('');
  };

  const userProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;

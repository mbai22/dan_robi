import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((beat) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === beat.id);
      if (exists) {
        return prev;
      }
      return [...prev, { ...beat, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((beatId) => {
    setCartItems(prev => prev.filter(item => item.id !== beatId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const cartCount = cartItems.length;
  
  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return total + price;
  }, 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isOpen,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

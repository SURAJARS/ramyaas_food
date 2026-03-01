import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message, submessage = '', type = 'success', showCheckoutButton = false, duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, submessage, type, showCheckoutButton };
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // For products with variants, create a unique key with variant info
      const itemKey = product.selectedVariant 
        ? `${product._id}_${product.selectedVariant.quantity}`
        : product._id;
      
      const existingItem = prevItems.find(item => {
        if (product.selectedVariant) {
          return item._id === product._id && item.selectedVariant?.quantity === product.selectedVariant.quantity;
        }
        return item._id === product._id;
      });
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }

      // Show toast notification
      const productName = product.nameEN || product.name || 'Item';
      const message = language === 'ta' 
        ? `${productName} சேர்க்கப்பட்டது` 
        : `${productName} added to cart`;
      
      showToast(message, '', 'success', true, 5000);
      
      return newItems;
    });
  };

  const removeFromCart = (productId, variant = null) => {
    setCartItems(prevItems => {
      let removedItem = null;
      let newItems;
      
      if (variant) {
        // Remove specific variant
        removedItem = prevItems.find(item => item._id === productId && item.selectedVariant?.quantity === variant.quantity);
        newItems = prevItems.filter(item => !(item._id === productId && item.selectedVariant?.quantity === variant.quantity));
      } else {
        // Remove all items with this product ID
        removedItem = prevItems.find(item => item._id === productId);
        newItems = prevItems.filter(item => item._id !== productId);
      }

      // Show toast notification
      if (removedItem) {
        const productName = removedItem.nameEN || removedItem.name || 'Item';
        const message = language === 'ta' 
          ? `${productName} நீக்கப்பட்டது` 
          : `${productName} removed from cart`;
        showToast(message, '', 'info', false, 3000);
      }

      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

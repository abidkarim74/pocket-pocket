import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './styles.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
      <div className="app">
        <Navbar cartItems={cartItems} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<ProductList onAddToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems} 
                  onRemoveFromCart={removeFromCart} 
                  onUpdateQuantity={updateQuantity} 
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cartItems={cartItems} 
                  total={total} 
                />
              } 
            />
          </Routes>
        </main>
      </div>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <h2 className="section-title">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemoveFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total: ${total.toFixed(2)}</p>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
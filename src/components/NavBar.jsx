import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItems }) => {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Pocket Rocket</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Products</Link>
          <Link to="/cart" className="navbar-link">
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
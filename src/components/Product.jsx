import React from 'react';

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-type">{product.type}</p>
        <p className="product-rice">Rs.{product.price.toFixed(2)}</p>
        <p className="product-stock">{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
        <button 
          onClick={() => onAddToCart(product)} 
          className="add-to-cart-btn"
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};

export default Product;
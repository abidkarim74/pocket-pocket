import React from 'react';
import Product from './Product';
import { products } from '../data/products';

const ProductList = ({ onAddToCart }) => {
  return (
    <div className="product-list">
      <h2 className="section-title">Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <Product 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
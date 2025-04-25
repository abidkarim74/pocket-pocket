import React, { useState } from 'react';

const Checkout = ({ cartItems, total }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setPaymentInfo(prev => ({ ...prev, [name]: formattedValue }));
    } 
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setPaymentInfo(prev => ({ ...prev, [name]: formattedValue }));
    }
    else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process payment here
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-icon">🎉</div>
        <h2>Thank You for Your Order!</h2>
        <p className="confirmation-text">Your protein bars are on their way!</p>
        <div className="order-details">
          <p><strong>Order Total:</strong> ₹{total.toFixed(2)}</p>
          <p>We've sent a confirmation to your email</p>
        </div>
        <a href="/" className="return-home-btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2 className="section-title">Complete Your Purchase</h2>
        <div className="checkout-steps">
          <span className="step active">1. Shipping</span>
          <span className="step active">2. Payment</span>
          <span className="step">3. Confirm</span>
        </div>
      </div>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h3 className="summary-title">Your Protein Bars</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-flavor">{item.flavor || 'Original'}</p>
                </div>
                <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h3 className="form-section-title">
              <span className="icon">🚚</span> Shipping Details
            </h3>
            <div className="form-group">
              <label>Full Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street address, apartment number"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Postal code"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">
              <span className="icon">💳</span> Payment Method
            </h3>
            <div className="payment-methods">
              <button type="button" className="payment-method active">
                Credit/Debit Card
              </button>
              <button type="button" className="payment-method">
                UPI
              </button>
              <button type="button" className="payment-method">
                Net Banking
              </button>
            </div>
            
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                maxLength="19"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                name="name"
                placeholder="As it appears on your card"
                value={paymentInfo.name}
                onChange={handlePaymentChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            <span className="lock-icon">🔒</span> Place Your Order - ₹{total.toFixed(2)}
          </button>
          
          <div className="secure-checkout">
            <span className="shield-icon">🛡️</span>
            <span>Secure SSL Encryption</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
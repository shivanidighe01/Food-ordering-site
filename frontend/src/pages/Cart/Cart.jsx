import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate correctly
import { StoreContext } from '../../context/StoreContext'; // No need to import StoreContextProvider here
import './Cart.css';

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate(); // Correctly using useNavigate
  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item) => {
            const quantity = cartItem?.[item._id] || 0;
            if (quantity > 0) {
              return (
                <div key={item._id} className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} /> {/* Added alt text for accessibility */}
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p> {/* Formatting price */}
                  <p>{quantity}</p>
                  <p>${(item.price * quantity).toFixed(2)}</p> {/* Formatting total */}
                  <p onClick={() => removeFromCart(item._id)} className="cross">X</p>
                  <hr />
                </div>
              );
            }
            return null; // Explicitly return null for the else case
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p> {/* Formatting subtotal */}
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0.00:2.00}</p> {/* Formatting delivery fee */}
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0.00:(getTotalCartAmount() + 2).toFixed(2)}</b> {/* Formatting total */}
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to checkout</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

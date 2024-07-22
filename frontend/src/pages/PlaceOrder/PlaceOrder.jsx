import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {
  const {getTotalCartAmount}=useContext(StoreContext)
  return (
    <>
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name'/>
          <input type="text" placeholder='Last Name'/>
        </div>
        <input type="email" placeholder='Email'/>
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input type="text" placeholder='City'/>
          <input type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code'/>
          <input type="text" placeholder='Country'/>
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-detail">
                <p>Subtotal</p>
                <p>${getTotalCartAmount().toFixed(2)}</p> {/* Formatting subtotal */}
              </div>
              <hr />
              <div className="cart-total-detail">
                <p>Delivery Fee</p>
                <p>$2.00</p> {/* Formatting delivery fee */}
              </div>
              <hr />
              <div className="cart-total-detail">
                <b>Total</b>
                <b>${(getTotalCartAmount() + 2).toFixed(2)}</b> {/* Formatting total */}
              </div>
            </div>
            <button>Proceed to Playment</button>
        </div>
      </div>

    </form>
    </>
  )
}

export default PlaceOrder
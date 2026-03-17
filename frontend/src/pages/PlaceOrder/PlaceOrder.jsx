import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isDeliveryInfoComplete = () => Object.values(data).every(field => field.trim() !== "");

  const totalAmount = getTotalCartAmount() + 2;

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Total</p>
            <b>₹{totalAmount}</b>
          </div>

          <button
            type="button"
            disabled={!isDeliveryInfoComplete()}
            style={{
              cursor: isDeliveryInfoComplete() ? "pointer" : "not-allowed",
              opacity: isDeliveryInfoComplete() ? 1 : 0.5
            }}
            onClick={() => {

              let orderItems = [];

              food_list.forEach((item) => {
                if (cartItems[item._id] > 0) {
                  let itemInfo = { ...item, quantity: cartItems[item._id] };
                  orderItems.push(itemInfo);
                }
              });

              const orderData = {
                address: data,
                items: orderItems,
                amount: totalAmount
              };

              navigate("/fake-payment", {
                state: { orderData }
              });

            }}
          >
            PROCEED TO PAYMENT
          </button>
          {!isDeliveryInfoComplete() && <span style={{ color: 'red' }}>Please fill all delivery details to proceed</span>}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
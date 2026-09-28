import React, { useCallback, useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const { token, url } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const fetchOrders = useCallback(async () => {
        setError("");
        try {
            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            if (!Array.isArray(response.data.data)) {
                throw new Error("Orders response was invalid");
            }

            setData(response.data.data);
        } catch {
            console.error("Failed to load orders");
            setData([]);
            setError("Unable to load your orders. Please try again.");
        }
    }, [token, url]);

    useEffect(() => {
        if (token) {
            void Promise.resolve().then(fetchOrders);
        }
    }, [token, fetchOrders])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="cotainer">
                {error && <p role="alert">{error}</p>}
                {!error && data.length === 0 && <p>No orders found.</p>}
                {!error && data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p> Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders} >Track Order</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default MyOrders

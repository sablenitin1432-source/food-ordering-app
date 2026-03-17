import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import clickSound from "../../assets/click.mp3";


const FakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, token } = useContext(StoreContext);
  const { amount, orderData } = location.state || {};
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const itemsTotal = orderData?.items?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {

    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    if (!email || !cardNumber || !expiry || !cvc || !cardName) {
      alert("Please fill all card details");
      return;
    }

    const audio = new Audio(clickSound);
    audio.play()

    console.log(orderData)
    console.log(amount)

    try {

      console.log("Sending order:", orderData);
      console.log("Token:", token);

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        setTimeout(() => {
          navigate("/success");
        }, 800);
      } else {
        alert("Order Failed");
      }

    } catch (error) {
      console.log(error);
    }

  };
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* LEFT SIDE ORDER SUMMARY */}
      <div style={{
        width: "50%",
        background: "#f6f9fc",
        padding: "40px"
      }}>
        <h2>SecurePay</h2>

        {orderData?.items?.map((item, index) => (
          <div key={index} style={{ marginTop: "15px" }}>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500"
            }}>
              <span>{item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              color: "gray",
              fontSize: "14px"
            }}>
              <span>Qty {item.quantity}</span>
              <span>₹{item.price} each</span>
            </div>

          </div>
        ))}

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px"
        }}>
          <span>Delivery Charges</span>
          <span>₹2</span>
        </div>


        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
          fontWeight: "bold",
          borderTop: "1px solid #ddd",
          paddingTop: "10px"
        }}>

        </div>

        <p style={{ marginTop: "40px", color: "gray" }}>Total</p>
        <h1>₹{amount}</h1>

      </div>
      
      {/* RIGHT SIDE PAYMENT FORM */}
      <div style={{
        width: "50%",
        padding: "40px"
      }}>
        <h3>Pay with card</h3>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "20px" }}
        />

        <input
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            placeholder="MM / YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{ width: "50%", padding: "10px" }}
          />
          <input
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            style={{ width: "50%", padding: "10px" }}
          />
        </div>

        <input
          placeholder="Cardholder name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "14px",
            background: "#635bff",
            color: "white",
            border: "none",
            marginTop: "20px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
          Pay ₹{amount}
        </button>

      </div>

    </div>
  );
}
export default FakePayment;
import React, { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import "./Success.css";
import { useNavigate } from "react-router-dom";

const Success = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // 10 sec nantar home page la redirect
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success-card">

        <BsCheckCircleFill className="success-icon" />

        <h1>Payment Successful!</h1>

        <p>Your order has been placed successfully ✅</p>

        <button
          onClick={() => navigate("/")}
          className="success-btn"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default Success;
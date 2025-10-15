// src/pages/Checkout/OrderSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="bg-white text-black rounded-lg shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">🎉 Order Placed Successfully!</h1>
        <p className="text-lg mb-6 text-center">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

// src/pages/Checkout/Checkout.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ToastContext } from "../../context/ToastContext";
import { AuthContext } from "../../context/AuthContext";

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const showToast = useContext(ToastContext);

  const navigate = useNavigate();
  const location = useLocation();
  const singleProduct = location.state?.product;

  // ✅ INITIAL ITEMS
  const getInitialItems = () => {
    if (singleProduct) {
      return [{ ...singleProduct, quantity: 1 }];
    }
    return cart.map(item => ({
      ...item,
      quantity: item.quantity ?? 1,
    }));
  };

  const [items, setItems] = useState(getInitialItems());
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  
  // 🔐 AUTH CHECK
  useEffect(() => {
    if (!user?.id) {
      navigate("/user");
    }
  }, [user, navigate]);

  // ✅ TOTAL
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.product_price || item.price) || 0) * item.quantity,
    0
  );

  // ➕ INCREMENT
  const handleIncrement = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.stock, item.quantity + 1),
            }
          : item
      )
    );
  };

  // ➖ DECREMENT
  const handleDecrement = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ❌ REMOVE
  const removeItem = (id) => {
    if (singleProduct) navigate(-1);
    else setItems(prev => prev.filter(item => item.id !== id));
  };

  // ✅ VALIDATION
  const validateOrder = () => {
    if (!address || address.trim().length < 5) {
  
      return false;
    }
    if (items.length === 0) {
     
      return false;
    }
    return true;
  };

  // 🛒 PLACE ORDER
const placeOrder = async () => {
    try {
      if (!validateOrder()) return;

      setLoading(true);

   const orderItems = items.map(item => ({
  product: item.product,   // backend expects "product"
  quantity: item.quantity,
  price: Number(item.product_price || item.price) || 0,
}));
const orderData = {
  items: orderItems,
  totel_amount: subtotal,
  address: address.trim(),
  paid: false,
};


  const token = localStorage.getItem("token");
   await axios.post(
  "http://127.0.0.1:8000/api/orders/orders/",
  orderData,
  {
    headers: {
      Authorization: `Bearer ${token}`, // or however you store the token
    },
  }
);
      navigate("/success", { state: { total: subtotal } });

    } catch (err) {
      console.error(err);
      
    } finally {
      setLoading(false);
    }
  };
console.log('current data',items)
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ADDRESS */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-3">Shipping Address</h2>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded mb-4"
            rows={4}
            placeholder="Enter full address"
          />

          <p className="font-bold mb-3">
            Total: ₹{subtotal.toLocaleString("en-IN")}
          </p>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}hi
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          {items.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div className="flex gap-3">
                <img
                  src={item.img || item.img1}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />

                <div>
                  <p className="font-medium">
                    {item.product_name || item.name}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="w-8 h-8 bg-black text-white rounded"
                    >
                      −
                    </button>

                    <span className="w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrement(item.id)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 bg-black text-white rounded disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{(
                    (Number(item.product_price || item.price) || 0) *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 font-bold text-lg">
            Total: ₹{subtotal.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("token");

  // 🔹 Load cart
  const loadCart = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/cart/view/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart_items);
      setTotalPrice(res.data.total_price);
    } catch (err) {
      console.error("Load cart error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
      setTotalPrice(0);
    }
  }, [user]);

  // 🔹 ADD TO CART
  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/add/",
        { product_id: productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadCart();
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
    }
  };

  // 🔹 UPDATE QUANTITY (CORE FIX)
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/cart/update/${itemId}/`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadCart();
    } catch (err) {
      console.error("Update cart error:", err.response?.data || err.message);
    }
  };

  // 🔹 REMOVE ITEM
  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/cart/delete/${itemId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadCart();
    } catch (err) {
      console.error("Remove cart error:", err.response?.data || err.message);
    }
  };

  // 🔹 INCREMENT / DECREMENT (ONLY CALCULATE HERE)
  const incrementQuantity = (itemId, currentQty, stock) => {
    if (currentQty < stock) {
      updateQuantity(itemId, currentQty + 1);
    }
  };

  const decrementQuantity = (itemId, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

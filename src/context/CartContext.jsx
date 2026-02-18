// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { cart as cartAPI } from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext); // use token from AuthContext
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // ---------------- LOAD CART ----------------
  const loadCart = async () => {
    if (!token) return;

    try {
      const res = await cartAPI.getCart(token);
      setCart(res.data.cart_items);
      setTotalPrice(res.data.total_price);
    } catch (err) {
      console.error("Load cart error:", err.response?.data || err.message);
    }
  };

  // Automatically reload cart when user logs in/out
  useEffect(() => {
    if (user && token) {
      loadCart();
    } else {
      setCart([]);
      setTotalPrice(0);
    }
  }, [user, token]);

  // ---------------- ADD ITEM ----------------
  const addToCart = async (productId, quantity = 1) => {
    if (!token) return;

    try {
      await cartAPI.addItem(productId, quantity, token);
      toast.success("Item added to cart!");
      loadCart();
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
    }
  };

  // ---------------- UPDATE ITEM ----------------
  const updateQuantity = async (itemId, quantity) => {
    if (!token) return;

    try {
      await cartAPI.updateItem(itemId, quantity, token);
      loadCart();
    } catch (err) {
      console.error("Update cart error:", err.response?.data || err.message);
    }
  };

  // ---------------- REMOVE ITEM ----------------
  const removeFromCart = async (itemId) => {
    if (!token) return;

    try {
      await cartAPI.removeItem(itemId, token);
      toast.success("Item removed from cart!");
      loadCart();
    } catch (err) {
      toast.error("Failed to remove item from cart.");
      console.error("Remove cart error:", err.response?.data || err.message);
    }
  };

  // ---------------- INCREMENT / DECREMENT ----------------
  const incrementQuantity = (itemId, currentQty, stock) => {
    if (currentQty < stock) updateQuantity(itemId, currentQty + 1);
  };

  const decrementQuantity = (itemId, currentQty) => {
    if (currentQty > 1) updateQuantity(itemId, currentQty - 1);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        loadCart, // expose loadCart if needed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

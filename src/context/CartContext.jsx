




import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import  {ToastContext}  from "../context/ToastContext";

let CartContext=createContext()

export const CartProvider = ({ children }) => {

  // toast=useContext()
  const [user, setUser] = useState(null); // full user object
  const [cart, setCart] = useState([]); // current cart items

  // load user object from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    try {
      const parsedUser = JSON.parse(userData);
      // If it's just an ID string, fetch the full user data
      if (typeof parsedUser === 'string') {
        const fetchUser = async () => {
          try {
            const { data } = await axios.get(`http://localhost:5000/users/${parsedUser}`);
            setUser(data); 
            const serverCart = Array.isArray(data.cart) ? data.cart.map((item) => ({ ...item, qty: item.qty ?? 1 })) : [];
            setCart(serverCart);
          } catch (err) {
            console.error(err);
            localStorage.removeItem("user");
          }
        };
        fetchUser();
      } else {
        // If it's already a full user object
        setUser(parsedUser);
        const serverCart = Array.isArray(parsedUser.cart) ? parsedUser.cart.map((item) => ({ ...item, qty: item.qty ?? 1 })) : [];
        setCart(serverCart);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // helper to persist cart to server and update local state
  const persistCart = async (nextCart) => {
    if (!user) return;
    
    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        cart: nextCart,
      });
      setCart(nextCart);
      const updatedUser = { ...user, cart: nextCart };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err);
    }
  };


  const addToCart = async (product) => {
    if (!user) {
      alert("Please log in first!", "error");
      return;
    }

   
    if (!product.stock || product.stock <= 0) {
      alert("This product is out of stock.", "error");
      return;
    }

    const idx = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (idx >= 0) {
      const existingItem = cart[idx];
      if (existingItem.qty >= existingItem.stock) {
        alert("Cannot add more than available stock.", "error");
        return;
      }
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: (item.qty ?? 1) + 1 } : item
      );
    } else {
      updatedCart = [{ ...product, qty: 1 }, ...cart];
    }

    await persistCart(updatedCart);
    alert("Added to cart", "success");
  };

  // remove from cart
  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    await persistCart(updatedCart);
  };

  const updateQuantity = async (productId, newQty) => {
    if (!user) return;

    const itemToUpdate = cart.find((item) => item.id === productId);
    if (itemToUpdate && newQty > itemToUpdate.stock) {
      alert("Cannot add more than available stock.", "error");
      return;
    }

    let updatedCart;
    if (newQty <= 0) {
      updatedCart = cart.filter((item) => item.id !== productId);
    } else {
      updatedCart = cart.map((item) => 
        item.id === productId ? { ...item, qty: newQty } : item
      );
    }
    await persistCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    if (item.qty >= item.stock) {
      alert("Out of stock", "error");
      return;
    }
    updateQuantity(productId, (item.qty ?? 1) + 1);
  };

  const decrementQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    const next = (item.qty ?? 1) - 1;
    updateQuantity(productId, next);
  };

 
  const updateUser = (userData) => {
    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      const serverCart = Array.isArray(userData.cart) ? userData.cart.map((item) => ({ ...item, qty: item.qty ?? 1 })) : [];
      setCart(serverCart);
    } else {
      setUser(null);
      setCart([]);
      localStorage.removeItem("user");
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        setUser: updateUser, // Use the updated function
        cart,
        setCart,
        cartCount: cart.reduce((sum, item) => sum + (item.qty ?? 1), 0),
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export  {CartContext};
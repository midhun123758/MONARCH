import axios from "axios";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
console.log("helloo",wishlist)
  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : null;
  };

  const fetchWishlist = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) return;

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/wishlist/wishlist_View/", { headers });
      setWishlist(res.data.wishlist_items);
    } catch (err) {
      console.error("Fetch error:", err.response?.data);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

 // WishlistContext.js
const addToWishlist = async (productId) => {
  const headers = getHeaders();
  if (!headers) return navigate("/login");

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/wishlist/wishlist_add/",
      { product_id: productId },
      { headers }
    );

    setWishlist((prev) => {
      // Check if this product is already in our React state
      const isAlreadyInWishlist = prev.some(item => item.product === productId);

      if (isAlreadyInWishlist) {
        // If it exists, remove it from the list
        return prev.filter(item => item.product !== productId);
      } else {
        // If it doesn't exist, add the new item sent by Django
        return [...prev, res.data];
      }
    });
  } catch (err) {
    console.error("Wishlist sync error:", err);
  }
};

  const removeFromWishlist = async (itemId) => {
    const headers = getHeaders();
    try {
      await axios.delete(`http://127.0.0.1:8000/api/wishlist/delete/${itemId}/`, { headers });
      setWishlist((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Delete error:", err.response?.data);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
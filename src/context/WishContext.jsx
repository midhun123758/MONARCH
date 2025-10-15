// src/context/WishContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || null);
  const [wishlist, setWishlist] = useState(storedUser?.wishlist || []);

  // Fetch user data from backend once
  useEffect(() => {
    if (!storedUser) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${storedUser.id}`);
        setUser(res.data);
        setWishlist(res.data.wishlist || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Toggle wishlist item
  const toggleWishlist = async (product) => {
            const res = await axios.get(`http://localhost:5000/users/${storedUser.id}`);
        setUser(res.data);


    if (!user) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const exists = wishlist.find((item) => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      // remove product
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      // add product
      updatedWishlist = [product, ...wishlist];
    }

    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });

      setWishlist(updatedWishlist);
      setUser({ ...user, wishlist: updatedWishlist });
      localStorage.setItem("user", JSON.stringify({ ...user, wishlist: updatedWishlist }));
    } catch (err) {
      console.error(err);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((item) => item.id !== productId);

    try {
      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        wishlist: updatedWishlist,
      });

      setWishlist(updatedWishlist);
      setUser({ ...user, wishlist: updatedWishlist });
      localStorage.setItem("user", JSON.stringify({ ...user, wishlist: updatedWishlist }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        user,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

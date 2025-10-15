import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishContext";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <Link
          to="/explore"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">

        <div className="bg-white h-[2vh] w-full"></div>
      <h1 className="text-3xl font-bold mb-8"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded p-4 flex flex-col"
          >
            <img
              src={item.img || item.img2}
              alt={item.name}
              className="w-full h-full object-cover "
            />
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-2">Price: ₹{item.price}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 px-3 py-2 bg-black text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-3 py-2 bg-black text-white rounded hover:bg-pink-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

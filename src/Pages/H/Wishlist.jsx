import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishContext";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <Link to="/explore" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          Browse Products
        </Link>
      </div>
    );
  }
console.log('this is data',wishlist)
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
              <img 
                src={item.product_image} 
                alt={item.product_name} 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.product_name}</h2>
                  <p className="text-gray-600 mt-1 font-bold">${item.product_price}</p>
                </div>
                
                <div className="mt-5 flex flex-col gap-2">
                  <button 
                    onClick={() => addToCart(item.product, 1)}
                    className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full text-red-500 text-sm py-1 hover:underline"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
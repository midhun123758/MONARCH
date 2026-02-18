import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const nav = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6 md:p-8 text-center">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          My Profile
        </h2>

        <div className="flex flex-col gap-6 items-center">

          <div>
            <h3 className="text-lg font-semibold text-black">
              Name
            </h3>
            <p className="text-gray-600">
              {user.username}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black">
              Email
            </h3>
            <p className="text-gray-600">
              {user.email}
            </p>
          </div>

          <div className="flex gap-10 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-black">
                Cart Items
              </h3>
              <p className="text-gray-600">
                {cart.length}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black">
                Wishlist Items
              </h3>
              <p className="text-gray-600">
                {wishlist.length}
              </p>
            </div>
          </div>

          <div className="mt-8 w-full flex justify-center">
            <button
              className="bg-black w-full md:w-60 py-3 text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition"
              onClick={() => nav("/history")}
            >
              Orders
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

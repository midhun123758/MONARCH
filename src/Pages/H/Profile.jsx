import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Profile() {
  const { user } = useContext(AuthContext); // user data from context
  const nav=useNavigate()
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 h-[95vh] w-[90vh] text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h2>

      <div className="flex flex-col gap-4 item-center justify-center mb-6" >
        <div>
          <h3 className="text-lg font-semibold text-black">Name</h3>
          <p className="text-gray-600">{user.username}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black">Email</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">cartcount</h3>
          {/* <p className="text-gray-600">{user.cart.length}</p> */}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black">WishlistCount</h3>
          {/* <p className="text-gray-600">{user.wishlist.length}</p> */}
        </div>
       <div className="flex justify-center items-center hover:text-gray-300 ">
        
        
       <div className="flex justify-center items-center hover:text-gray-300 "></div>
        
       <button className="bg-black w-[20vh] h-20px text-white items-center rounded-lg font-bold text-xl align-center" onClick={()=>nav("/history")}>
        Orders
       </button>

       </div>
      </div>
    </div>
  );
}

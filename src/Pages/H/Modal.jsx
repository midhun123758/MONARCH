import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ show, onClose }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // close on outside click
    >
      <div >
      {/* Card with background image */}
      <div
        className="  shadow-2xl items-center  w-[700px] h-[430px]"
        style={{
          backgroundImage: `url('/assets/what.jpg')`, // 🔹 change this path
        }}
        onClick={(e) => e.stopPropagation()} // prevent close on click inside
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 p-8  text-white">
          <h2 className="text-3xl font-bold mb-4 drop-shadow-md">
             Special Offer!
          </h2>
          <p className="text-white/500 mb-6">
            Sign up now to get exclusive deals and updates.
         <br />
           <b className="text-[40px] font-bold color-black">Get  offer on your first purchase!</b> 
          </p>

          <button
            onClick={() => navigate("/user")}
            className="w-full bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition mb-3"
          >
            Sign Up / Login
          </button>

          <button
            onClick={onClose}
            className="w-full text-white border border-white/50 py-2 rounded hover:bg-white/20 transition"
            
          >
            Maybe later
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Modal;

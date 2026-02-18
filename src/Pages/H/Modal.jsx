import React from "react";
import { useNavigate } from "react-router-dom";

function Modal({ show, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-[700px] h-[70vh] md:h-[430px] rounded-lg overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url('/assets/what.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-10 text-white">
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Special Offer!
          </h2>

          <p className="text-sm md:text-base mb-4">
            Sign up now to get exclusive deals and updates.
          </p>

          <h3 className="text-xl md:text-4xl font-bold mb-6">
            Get offer on your first purchase!
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/user")}
              className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              Sign Up / Login
            </button>

            <button
              onClick={onClose}
              className="w-full border border-white py-2 rounded hover:bg-white/20 transition"
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

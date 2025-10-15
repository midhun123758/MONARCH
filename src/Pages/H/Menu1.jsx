import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Menu1({ onClose }) {
  return (
    <>
      {/* Blur background */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed left-0 top-0 h-full w-full sm:w-[300px] bg-white z-50 p-6 overflow-y-auto text-black">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={onClose}>
   <X size={24} />
          </button>
        </div>
        {/* Links */}
        <div className="flex flex-col space-y-6">
          <Link
            to="/pants"
            onClick={onClose}
   className="text-lg font-medium hover:text-gray-600 transition-colors"
          >
            PANTS
          </Link>
  <Link
            to="/shirts"
     onClick={onClose}
            className="text-lg font-medium hover:text-gray-600 transition-colors"
          >
            SHIRTS
          </Link>
          <Link
            to="/tshirts"
            onClick={onClose}
 className="text-lg font-medium hover:text-gray-600 transition-colors"
          >
            TSHIRTS
          </Link>
        </div>
      </div>
    </>
  );
}
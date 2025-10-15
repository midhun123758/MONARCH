// // ProductDetails.jsx
// import React, {  useEffect, useState,useContext } from "react";
// import { useParams } from "react-router-dom";
// import { CartContext } from "../context/CartContext";

// export default function ProductDetails() {
//   const { id } = useParams();        // get product id from URL
//   const [product, setProduct] = useState(null);
//   const {setValue}=useContext(CartContext)
//   useEffect(() => {
//     fetch(`http://localhost:5000/Shirts/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   if (!product) return <div className="p-6 text-center">Loading product…</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <img
//         src={product.img}
//         alt={product.name}
//         className="w-full h-full object-cover rounded mb-4"
//       />
//       <p className="text-xl text-gray-700 mb-2">Price: ₹{product.price}</p>
//       <p className="text-gray-600 mb-4">{product.description}</p>

//       <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={setValue(product)}>
//         Add to Cart
//       </button>
//     </div>
//   );
// }
import React from 'react'

function View() {
  return (
    <div>
      
    </div>
  )
}

export default View

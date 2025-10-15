// // src/pages/Product/ViewProduct.jsx
// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishContext";
// export default function ViewProduct() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//  const {   wishlist, toggleWishlist } = useContext(WishlistContext);
//   const product = location.state?.product;
//   const inWishlist = Array.isArray(wishlist)
//     ? wishlist.some((item) => item.id === product.id)
//     : false;
//  console.log(product)
//   if (!product) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-gray-500">
//         Product not found. Go back to{" "}
//         <span
//           className="text-blue-600 cursor-pointer ml-1"
//           onClick={() => navigate(-1)}
//         >
//           Shirts
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center p-10">
//       <img
//         src={product.img}
//         alt={product.name}
//         className="w-[400px] h-[500px] object-cover rounded-lg shadow-lg"
//       />

//       <div className="ml-10 mt-5 md:mt-0 max-w-[400px]">
//         <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
//         <p className="text-gray-700 text-xl mb-2">₹{product.price}</p>
//         <p className="text-gray-500 mb-6">{product.description}</p>

//         <div className="flex gap-3">
//           {/* Add to Cart */}
//           <button
//             onClick={() => addToCart(product)}
//             className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
//           >
//             Add to Cart
//           </button>

//           {/* Buy Now */}
//           <button
//             onClick={() =>
//               navigate("/buy", {
//                 state: { product }, // pass product to Checkout page
//               })
//             }
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
//           >
//             Buy Now
//           </button>

//           <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleWishlist(dress);
//           }}
//           className={`px-3 py-2 rounded text-sm transition-all ${
//             inWishlist ? "bg-pink-500 text-white" : "bg-white "
//           }`}
//           aria-pressed={inWishlist}
//         >
//           {inWishlist ? "♥" : "♡"}
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { use, useContext, useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishContext";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"




 export default function ViewProduct() {
    const [hovered, setHovered] = useState(false);
  const [additional,setAdditional]=useState([])
  const images=[]
  const[image,setImage]=useState(0)
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  console.log(image)
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
window.scrollTo({ top: 0, behavior: "smooth" });
  const product = location.state?.product;
 images.push(product.img,product.img2,product.img3,product.img4)
 console.log(images)
  // ✅ Use product instead of dress
  const inWishlist = Array.isArray(wishlist)
    ? wishlist.some((item) => item.id === product.id)
    : false;
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Product not found. Go back to{" "}
        <span
          className="text-blue-600 cursor-pointer ml-1"
          onClick={() => navigate(-1)}
        >
          Shirts
        </span>
    
      </div>
    );
 
    
  }
   useEffect(() => {
      fetch("http://localhost:5000/Allproducts")
        .then((res) => res.json())
        .then((data) => setAdditional(data.filter(d=>d.category==product.category)))
        .catch((err) => console.error("Error fetching dresses:", err));
        
    }, []);
        console.log(additional);
   console.log(product.category);
   console.log("heii");

   console.log(additional);
   
     
   
  return (
    <div  className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center p-10">
       <button onClick={()=>{image!="3"? (setImage(image+1)):(setImage(0))}}>   <ArrowLeftIcon className="h-8 w-7 text-black" />
</button>
      <img
        src={images[image]}
        alt={product.name}
        className="w-[600px] h-[700px] object-cover  shadow-lg"
      />
     
     <button onClick={()=>{image!="0"? (setImage(image-1)):(setImage(3))}}>
    <ArrowRightIcon className="h-8 w-7 text-gray-700" /></button>




      <div className="ml-10 mt-5 md:mt-0 max-w-[400px]">
        <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

        <p className="text-gray-700 text-xl mb-2">₹{product.price}</p>
        <p className="text-gray-500 mb-6">{product.description}</p>
         <p className="text-gray-700 text-xl mb-2">Stock:{product.stock}</p>
      
         
        <div className="flex gap-3">
          {/* Add to Cart */}

          {/* Buy Now */}
          <button
            onClick={() =>
              navigate("/buy", {
                state: { product }, // pass product to Checkout page
              })
            }
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
          >
            Buy Now
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product); // Corrected from 'dress' to 'product'
            }}
            className={`px-3 py-2 rounded text-sm transition-all ${
              inWishlist ? "bg-pink-500 text-white" : "bg-white border border-gray-300"
            }`}
            aria-pressed={inWishlist}
          >
            {inWishlist ? "♥" : "♡"}
          </button>
            <button
          onClick={() => addToCart(product)}
          className="px-3 bg-white py-1 text-black text-sm hover:bg-blue-600/90 font-bold rounded"
        >
          Add to Cart
        </button>
        </div>
      </div>
      <div>
    


      </div>
    </div>
  );
}

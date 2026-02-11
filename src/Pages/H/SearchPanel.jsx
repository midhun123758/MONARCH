// src/pages/H/SearchPanel.jsx
import React, { useState, useEffect, useMemo, use } from "react";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchPanel({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [sortOption, setSortOption] = useState("defult"); // default sort
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:5000/Allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = useMemo(() => {
    console.log(products)
    let filtered = query
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

    if (sortOption === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if(sortOption === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }else if(sortOption === "demand"){
      filtered = filtered.sort((a, b) => b.stock - a.stock);
    }

    return filtered;
  }, [products, query, sortOption]);
  

  return (
    <>
      {/* Blur background */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[600px] bg-white z-50 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Search Items</h2>
  <button onClick={onClose}>
       <X size={24} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-4 py-2  mb-4 w-[200px] text-black"
        >
          <option value="defult"> Sort by</option>
   <option value="asc">Price: Low to High</option>
    <option value="desc">Price: High to Low</option>
          <option value="demand">Stock Base</option>"
        </select>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
   placeholder="Search products..."
            value={query}
      onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Product List */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div
         key={p.id}
         className="cursor-pointer hover:bg-gray-100 text-black"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
        onClick={() =>
                    navigate("/product", { state: { product: p } })
         }
                  src={hoveredId === p.id && p.img2 ? p.img2 : p.img}
           alt={p.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-gray-600">₹{p.price}</p>
         <p className="text-gray-600">Stock:{p.stock}</p>
              </div>
            ))
          ) : query ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <p className="text-center text-gray-500">
    Type to search products...
            </p>
          )}
        </div>
      </div>
    </>
  );
}

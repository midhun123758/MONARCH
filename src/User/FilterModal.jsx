import React, { useState, useEffect } from 'react';

const FilterModal = ({ onApply, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: { min: 0, max: 10000 },
    sortBy: 'popularity',
  });

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      category: checked
        ? [...prev.category, value]
        : prev.category.filter((c) => c !== value),
    }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [e.target.name]: Number(e.target.value) },
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  const applyFilters = () => {
    onApply(filters);
    closeModal();
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: [],
      priceRange: { min: 0, max: 10000 },
      sortBy: 'popularity',
    };
    setFilters(clearedFilters);
    onClear(clearedFilters);
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Filters
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 md:max-w-md transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Electronics', 'Books', 'Clothing', 'Home Goods', 'Toys', 'Sports'].map((cat) => (
                    <label key={cat} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={filters.category.includes(cat)}
                        onChange={handleCategoryChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    name="min"
                    value={filters.priceRange.min}
                    onChange={handlePriceChange}
                    className="w-full border p-2 rounded"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="max"
                    value={filters.priceRange.max}
                    onChange={handlePriceChange}
                    className="w-full border p-2 rounded"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Sort By Filter */}
              <div>
                <h3 className="text-lg font-medium mb-2">Sort By</h3>
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t space-x-3">
              <button onClick={clearFilters} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Clear
              </button>
              <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
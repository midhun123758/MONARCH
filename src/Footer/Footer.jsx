import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">MONARCH'</h3>
            <p className="text-sm leading-6">
              Elevate your style. Discover the best shirts, pants, and more at unbeatable prices.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white">Home</a>
              </li>
              <li>
                <a href="/shirts" className="hover:text-white">Shirts</a>
              </li>
              <li>
                <a href="/pants" className="hover:text-white">Pants</a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white">Cart</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: midhunchandran230@gmail.com</li>
              <li>Phone: +91 7559976674</li>
              <li>Address: Palakkad, Kerala</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-5">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

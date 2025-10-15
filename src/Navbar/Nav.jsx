import React, { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishContext"; // ⬅️ import wishlist context
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, User } from "lucide-react";
import SearchPanel from "../Pages/H/SearchPanel";
import Menu1 from "../Pages/H/Menu1";
import {CartContext} from "../context/CartContext";
function Nav() {
  // cart
  const { cartCount } = useContext(CartContext);
  // wishlist
  const { wishlist } = useContext(WishlistContext); // we only need wishlist array
  const wishlistCount = wishlist?.length || 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const {user}=useContext(CartContext)
  const userId = user?.id || user
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const nav=useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/Monarch" || location.pathname === "/explore";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <div>
      {/* Navbar */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full h-[60px] z-50 transition-all duration-300 ${
          isHomePage && !scrolled
            ? "bg-transparent text-white"
            : "bg-white text-black shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16 items-center">
            {/* Left side: Menu Icon */}
            <div className="flex items-center">
              <button
                onClick={() => setMenu(true)}
                className={`relative transition ${
                  isHomePage && !scrolled
                    ? "hover:text-gray-300"
                    : "hover:text-gray-600"
                }`}
              >
                <Menu size={28} />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div  className="flex items-center gap-2">
                <Link  to="/Monarch">
              <div className={`h-10 w-10 flex items-center justify-center font-bold transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "bg-gray-800 text-white"
                  : "bg-black text-white"
              }`}>
                MW
              </div>
                </Link>
                <Link  to="/">
              <span className="hidden sm:inline text-lg font-semibold tracking-tight">
                MONARCH&apos;
              </span>
                </Link>
              </div>
            </div>

            {/* Search + Wishlist + Cart + Mobile button */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`relative transition ${
                  isHomePage && !scrolled
                    ? "hover:text-gray-300"
                    : "hover:text-gray-600"
                }`}
              >
                <Search size={28} />
              </button>

              {/* Wishlist icon */}
              <Link to="/wishlist" className="hidden md:inline-flex items-center gap-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={wishlistCount > 0 ? "red" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart icon */}
              <Link to="/cart" className="hidden md:inline-flex items-center gap-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
 
      {/* Slide-over cart panel */}
      {isSearchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
         {isMenu && <Menu1 onClose={() => setMenu(false)} />}
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md md:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                <Link to="/user" className={`text-sm font-medium hidden sm:block transition ${
                  isHomePage && !scrolled
                    ? "hover:text-gray-300"
                    : "hover:text-gray-600"
                }`}>
                  {userId ? "logout" : "login/signup"}
                </Link>
                {userId && (
                  <Link to="/profile" className={`transition ${
                    isHomePage && !scrolled
                      ? "hover:text-gray-300"
                      : "hover:text-gray-600"
                  }`}>
                    <User size={24} />
                  </Link>
                )}
              </div>
            </div>
         
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/20 bg-black/50">
            <div className="px-4 pt-4 pb-4 space-y-4">
              <Link to="/" className="block text-sm font-medium">
                Home
              </Link>
              <Link to="/Shirts" className="block text-sm font-medium">
                Shirts
              </Link>
              <Link to="/Pants" className="block text-sm font-medium">
                Pants
              </Link>
              <Link to="/tshirts" className="block text-sm font-medium">
                T-shirts
              </Link>
              <Link to="/wishlist" className="block text-sm font-medium">
                Wishlist
              </Link>
              <Link to="/cart" className="block text-sm font-medium">
                Cart
              </Link>
              <Link to="/profile" className="block text-sm font-medium">
                profile
              </Link>
              <Link to="/user" className="block text-sm font-medium sm:hidden">
                {userId ? "Logout" : "Login / Signup"}
              </Link>
            </div>
           
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;

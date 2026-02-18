import React, { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../context/WishContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, User, X, LogOut } from "lucide-react";
import SearchPanel from "../Pages/H/SearchPanel";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { cartCount } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const wishlistCount = wishlist.filter((item) => item.id).length;

  const { user, logout } = useContext(AuthContext);
  const userId = user?.id || user;

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/monarch" ||
    location.pathname === "/explore";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full h-[60px] z-50 transition-all duration-300 ${
          isHomePage && !scrolled
            ? "bg-transparent text-white"
            : "bg-white text-black shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden"
            >
              <Menu size={28} />
            </button>

            {/* CENTER LOGO */}
            <div className="flex-1 flex justify-center items-center">

              {/* Desktop Logo */}
              <Link to="/" className="hidden md:flex items-center gap-2">
                <div className="h-10 w-10 bg-black text-white flex items-center justify-center font-bold">
                  MW
                </div>
                <span className="text-lg font-semibold tracking-wider">
                  MONARCH
                </span>
              </Link>

              {/* Mobile Logo */}
              <Link to="/" className="md:hidden">
                <span className="text-lg font-bold tracking-wider">
                  MONARCH
                </span>
              </Link>
            </div>

            {/* DESKTOP RIGHT */}
            <div className="hidden md:flex items-center gap-6">

              {/* Search */}
              <button onClick={() => setSearchOpen(true)}>
                <Search size={24} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative">
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

              {/* Cart */}
              <Link to="/cart" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
                </svg>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile + Logout */}
              {userId ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <User size={24} />
                  </Link>
                  <button onClick={logout}>
                    <LogOut size={24} />
                  </button>
                </div>
              ) : (
                <Link to="/user">
                  <User size={24} />
                </Link>
              )}

            </div>

            {/* MOBILE SEARCH */}
            <div className="flex md:hidden items-center">
              <button onClick={() => setSearchOpen(true)}>
                <Search size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <X
                size={24}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-5 text-lg">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({cartCount})
              </Link>

              {userId ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/user" onClick={() => setMenuOpen(false)}>
                  Login / Signup
                </Link>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/monarch"
              onClick={() => setMenuOpen(false)}
              className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              Explore MONARCH
            </Link>
          </div>
        </div>
      </div>

      {/* SEARCH PANEL */}
      {isSearchOpen && (
        <SearchPanel onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}

export default Nav;

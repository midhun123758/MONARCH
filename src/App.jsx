import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Context Providers
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishContext";
import { AuthProvider } from "./context/AuthContext.jsx";
// Shared components
import Nav from "./Navbar/Nav";
import Footer from "./Footer/Footer";

// User-facing pages
import Home from "./Pages/H/Home";
import Contact from "./Navbar/Contact";
import Pants from "./Pages/H/Pants";
import Shirts from "./Pages/H/Shirts";
import Explore from "./Pages/H/Explore";
import Monarch from "./Pages/H/Monarch";
import CartPages from "./Pages/H/CartPages";
import UserFile from "./User/UserFile";
import Tshirts from "./Pages/Tshitrs";
import View from "./Pages/View";
import Wishlist from "./Pages/H/Wishlist";
import NewArrive from "./Pages/H/NewArrive";
import Offer1 from "./Pages/Offer1";
import SearchPanel from "./Pages/H/SearchPanel";
import Menu1 from "./Pages/H/Menu1";
import Succes from "./Pages/H/Succes";
import Orderhistory from "./Pages/H/Orderhistory";
// Admin pages
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageUser from "./Admin/ManageUser";
import ManageProduct from "./Admin/ManageProduct";
import ViewOrders from "./Admin/ViewOrders";
import Profile from "./Pages/H/Profile";
import BuyCheckout from "./Pages/H/BuyCheckout";
import ViewProduct from "./Pages/H/ViewProduct";
import Adding from "./Admin/Adding";
import ItemEdit from "./Admin/ItemEdit";
import Edituser from "./Admin/Edituser";
import { AdminProtectedRoute, UserProtectedRoute } from "./context/ProtectedRoutes";


const UserLayout = () => (
  <>
    <Nav />
    <div className="pt-0">
      <Outlet />
    </div>
    <Footer />
  </>
);
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>

            {/* USER ROUTES */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} 
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pants" element={<Pants />} />
              <Route path="/shirts" element={<Shirts />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/monarch" element={<Monarch />} />
              <Route path="/user" element={<UserFile />} />
              <Route path="/tshirts" element={<Tshirts />} />
              <Route path="/newar" element={<NewArrive />} />
              <Route path="/offer1" element={<Offer1 />} />
              <Route path="/product/:id" element={<View />} />
              <Route path="/search" element={<SearchPanel />} />
              <Route path="/menu" element={<Menu1 />} />
              <Route path="/success" element={<Succes/>} />
               
              {/* Protected User Routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/cart" element={<CartPages />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/buy" element={<BuyCheckout />} />
                <Route path="/product" element={<ViewProduct />} />
                <Route path="/history" element={<Orderhistory/>} />
                <Route path="/ordersuccess" element={<toas/>} />
              </Route>
            </Route>
         
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<ManageUser />} />
              <Route path="products" element={<ManageProduct />} />
              <Route path="products/add" element={<Adding />} />
              <Route path="orders" element={<ViewOrders />} />
           <Route path="products/edit/:id" element={<ItemEdit />} />
           <Route path="user/edit/:id" element={<Edituser />} />
              </Route>
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

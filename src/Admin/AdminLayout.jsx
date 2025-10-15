import { NavLink, Outlet } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';
const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-4">
          <NavLink to="/admin/dashboard" className="block hover:text-blue-400">Dashboard</NavLink>
          <NavLink to="/admin/users" className="block hover:text-blue-400">Manage Users</NavLink>
          <NavLink to="/admin/products" className="block hover:text-blue-400">Manage Products</NavLink>
          <NavLink to="/admin/orders" className="block hover:text-blue-400">Manage Orders</NavLink>
        </nav>
        <button className="p-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate('/')}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">

  
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";

// Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboardV2 = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalSales: 0,
  });

  const [charts, setCharts] = useState({
    revenueByCategory: [],
    salesStatus: [],
    mostSoldItems: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/users"),
          axios.get("http://127.0.0.1:8000/api/products/"),
          axios.get("http://localhost:5000/orders"),
        ]);

        const users = usersRes.data;
        const products = productsRes.data;
        const orders = ordersRes.data;

        const deliveredOrders = orders.filter(o => o.status === "delivered");

        // Stats
        const totalRevenue = deliveredOrders.reduce(
          (sum, order) => sum + order.total,
          0
        );

        setStats({
          totalUsers: users.length,
          totalProducts: products.length,
          totalRevenue,
          totalSales: orders.length,
        });

        // Map for products
        const productMap = new Map(products.map(p => [p.id, p]));

        // Revenue by Category
        const categoryRevenue = {};
        const productQuantity = {};

        deliveredOrders.forEach(order => {
          order.items.forEach(item => {
            const product = productMap.get(item.id);
            if (product) {
              const revenue = item.price * item.qty;
              categoryRevenue[product.category] =
                (categoryRevenue[product.category] || 0) + revenue;

              productQuantity[product.name] =
                (productQuantity[product.name] || 0) + item.qty;
            }
          });
        });

        // Order Status
        const orderStatus = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        setCharts({
          revenueByCategory: Object.entries(categoryRevenue).map(([name, value]) => ({ name, value })),
          salesStatus: Object.entries(orderStatus).map(([name, value]) => ({ name, value })),
          mostSoldItems: Object.entries(productQuantity)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard V2</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="text-green-800" />}
          color="bg-green-200"
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={<ShoppingCart className="text-blue-800" />}
          color="bg-blue-200"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="text-purple-800" />}
          color="bg-purple-200"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="text-orange-800" />}
          color="bg-orange-200"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Status */}
       
        {/* Sales Status */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={charts.salesStatus} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Most Sold Items */}
      
      </div>
    </div>
  );
};

export default AdminDashboardV2;

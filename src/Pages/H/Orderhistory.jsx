import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Adjust path as needed
import { AuthContext } from "../../context/AuthContext";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Check if user is logged in using context
        if (!user) {
        
          navigate("/user");
          return;
        }

        // Get all products to match with order items
        const productsRes = await axios.get("http://localhost:5000/Allproducts");
        
        // Get user's actual orders from the orders collection
        const ordersRes = await axios.get(`http://localhost:5000/orders?userId=${user.id}`);
        const userOrders = ordersRes.data;

        console.log("Found orders:", userOrders); // Debug log

        // Enhance orders with product images and details
        const enhancedOrders = userOrders.map(order => ({
          ...order,
          items: order.items.map(item => {
            const product = productsRes.data.find(p => p.id === item.productId);
            return {
              ...item,
              img: product?.img || "",
              category: product?.category || "",
              img2: product?.img2 || ""
            };
          })
        }));

        // Sort orders by date (newest first)
        enhancedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(enhancedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "finish":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading only when actually loading, not when checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg font-semibold">
        Loading your order history...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-lg font-semibold text-gray-600">
        <p className="mb-4">You have no orders yet.</p>
        <button 
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order # {order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      Total: ₹{order.total?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-700 mb-4">Items ({order.items.length})</h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{item.name}</h5>
                        <p className="text-sm text-gray-600">Category: {item.category || "N/A"}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{item.subtotal?.toLocaleString("en-IN")}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status || order.status)}`}>
                          {(item.status || order.status).charAt(0).toUpperCase() + (item.status || order.status).slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Shipping Address:</span> {order.address}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
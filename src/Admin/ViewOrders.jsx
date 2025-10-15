// src/pages/Admin/ViewOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  // Update item status & automatically update order status
  const updateProductStatus = async (orderId, productId, newStatus) => {
    try {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;

      // Update the specific item status
      const updatedItems = order.items.map((item) =>
        item.productId === productId ? { ...item, status: newStatus } : item
      );

      // Determine overall order status
      let orderStatus = "pending";
      const statuses = updatedItems.map((i) => i.status || "pending");

      if (statuses.every((s) => s === "delivered")) {
        orderStatus = "delivered";
      } else if (statuses.every((s) => s === "shipped" || s === "delivered")) {
        orderStatus = "shipped";
      } else {
        orderStatus = "pending";
      }

      // Update order in backend
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        items: updatedItems,
        status: orderStatus,
      });

      // Update local state
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, items: updatedItems, status: orderStatus } : o
        )
      );

      alert(`Item status updated to ${newStatus}. Order status is now ${orderStatus}`);
    } catch (err) {
      console.error("Failed to update product status:", err);
      alert("Failed to update status. Check console.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Order #{order.id} - User ID: {order.userId}
            </h2>

            <ul className="divide-y">
              {order.items.map((item) => (
                <li
                  key={item.productId}
                  className="py-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {item.name} (Qty: {item.quantity})
                    </p>
                    <p>₹{item.price * item.quantity}</p>
                    <p>
                      Status:{" "}
                      <span className="capitalize">{item.status || "pending"}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={item.status === "shipped" || item.status === "delivered"}
                      className={`px-3 py-1 rounded ${
                        item.status === "shipped" || item.status === "delivered"
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      onClick={() =>
                        updateProductStatus(order.id, item.productId, "shipped")
                      }
                    >
                      Shipped
                    </button>
                    <button
                      disabled={item.status === "delivered"}
                      className={`px-3 py-1 rounded ${
                        item.status === "delivered"
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                      onClick={() =>
                        updateProductStatus(order.id, item.productId, "delivered")
                      }
                    >
                      Delivered
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-right font-bold mt-2">
              Total: ₹
              {order.items
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString("en-IN")}
            </p>
            <p className="text-right mt-1">
              Order Status:{" "}
              <span className="capitalize font-semibold">{order.status}</span>
            </p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

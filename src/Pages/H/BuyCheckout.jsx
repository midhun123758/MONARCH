// src/pages/Checkout/Checkout.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ToastContext } from "../../context/ToastContext";

export default function CheckoutPage() {

  const { user, setUser, cart } = useContext(CartContext);
  const  showToast  = useContext(ToastContext);
  
  // Get routing tools from React Router to navigate and get location state
  const location = useLocation();
  const navigate = useNavigate();

  // This component handles two scenarios:
  // 1. "Buy Now": A single product is passed directly to checkout.
  // 2. "Cart Checkout": The user checks out with all items in their cart.
  // We check `location.state` to see if a single product was passed.
  const singleProduct = location.state?.product;

  // This function determines the initial items for checkout.
  const getInitialItems = () => {
    if (singleProduct) {
      // If it's a "Buy Now" purchase, create an array with just that one product.
      // We add a `qty` of 1 to it.
      return [{ ...singleProduct, qty: 1 }];
    }
    // Otherwise, use all the items from the shopping cart.
    return cart;
  };

  // 'items' will hold the products for this checkout.
  const [items, setItems] = useState(getInitialItems());
  
  // State to hold the user's shipping address from the textarea.
  const [address, setAddress] = useState("");
  // State to show a loading indicator on the button while the order is processed.
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.id) {
      alert("Please log in before checking out.", "error");
      navigate("/user");
    }
  }, [user, navigate]);

  // Calculate the total price of all items. This runs every time 'items' changes.
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.qty ?? 1),
    0
  );

  // --- Quantity Handlers ---

  // Increases the quantity of an item, but not more than the available stock.
  const handleIncrement = (id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.min(item.stock, (item.qty ?? 1) + 1) } : item
    ));
  };

  // Decreases the quantity of an item.
  const handleDecrement = (id) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.qty <= 1) {
        // If it's a "Buy Now" checkout, we don't want to remove the item.
        // The quantity will just stay at 1.
        if (singleProduct) return prev;
        
        // If it's a cart checkout and quantity is 1, decrementing removes the item.
        return prev.filter(i => i.id !== id);
      }
      // Otherwise, just decrease the quantity by 1.
      return prev.map(i => 
        i.id === id ? { ...i, qty: (i.qty ?? 1) - 1 } : i
      );
    });
  };

  // --- Helper functions for placing the order ---

  const validateOrder = () => {
    if (!user || !user.id) {
      alert("Please log in before placing an order.", "error");
      return false;
    }
    if (!items || items.length === 0) {
      alert("No items to checkout.", "error");
      return false;
    }
    if (!address || address.trim().length < 5) {
      alert("Please enter a valid address.", "error");
      return false;
    }
    return true;
  };

  // This function loops through the items and tells the server to decrease the stock count.
  const updateProductStock = async () => {
    for (const item of items) {
      const { data: currentProduct } = await axios.get(`http://localhost:5000/Allproducts/${item.id}`);
      const newStock = (Number(currentProduct.stock) || 0) - (item.qty ?? 1);

      if (newStock < 0) {
        throw new Error(`Not enough stock for ${item.name}.`);
      }

      await axios.patch(`http://localhost:5000/Allproducts/${item.id}`, { stock: newStock });
    }
  };

  // This function clears the user's cart and adds the new order ID to their profile.
  const clearUserCartAndPersistOrder = async (orderId) => {
    const updatedOrders = Array.isArray(user.orders)
      ? [...user.orders, orderId]
      : [orderId];

    // Update user in the database
    await axios.patch(`http://localhost:5000/users/${user.id}`, {
      cart: [],
      orders: updatedOrders,
    });

    // Update local state and localStorage using context function
    const updatedUser = {
      ...user,
      cart: [],
      orders: updatedOrders,
    };
    setUser(updatedUser); // This function from CartContext handles all local updates
  };

  // --- Main order placement function ---

  const placeOrder = async () => {
    try {
      // 1. Show the loading spinner on the button.
      setLoading(true);
      // 2. Check if the user is logged in and the address is valid.
      if (!validateOrder()) return;

      // 3. Generate a unique, random ID for the new order.
      const generateOrderId = () => {
        return Math.random().toString(36).substr(2, 4);
      };
      const orderId = generateOrderId();

      // 4. Prepare the data for the new order object.
      // This includes details about the user, items, total price, and address.
      const orderItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        quantity: item.qty ?? 1,
        subtotal: (Number(item.price) || 0) * (item.qty ?? 1),
      }));
      const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
      const orderData = {
        id: orderId, // Add the generated ID here
        userId: user.id,
        items: orderItems,
        name: user.name,
        email: user.email,
        total,
        address: address.trim(),
        status: "pending", // Changed from "finish" to "pending" for new orders
        createdAt: new Date().toISOString(),
      };

      console.log("Placing order:", orderData);

      // 5. Update the stock for each product in the database.
      await updateProductStock();

      // 6. Save the complete order details to the "orders" collection in the database.
      await axios.post("http://localhost:5000/orders", orderData);
      
      // 7. Clear the user's cart and update their profile with the new order ID.
      await clearUserCartAndPersistOrder(orderId);

      // 8. Show a success message and navigate to the success page.
      alert("Order placed successfully!", "success");
      navigate("/success", { 
        state: { 
          orderId: orderId,
          total: total
        } 
      });
    } catch (err) {
      // If anything goes wrong, show an error message.
      console.error("Order placement error:", err);
      showToast("Failed to place the order. Please try again.", "error");
    } finally {
      // 9. No matter what happens (success or error), stop the loading spinner.
      setLoading(false);
    }
  };

  // Remove item from checkout
  const removeItem = (id) => {
    // If it's a "Buy Now" checkout, removing the only item means canceling.
    if (singleProduct) {
      // So, we just go back to the previous page.
      navigate(-1);
    } else {
      // If it's a cart checkout, filter the item out of the local `items` state.
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete shipping address"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-black focus:border-transparent"
            rows={4}
          />

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">
              Items: <strong>{items.length}</strong>
            </p>
            <p className="text-lg font-bold text-gray-800">
              Total: ₹{subtotal.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading || items.length === 0}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Placing Order..." : `Place Order - ₹${subtotal.toLocaleString("en-IN")}`}
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                       <div className="mt-3 flex items-center gap-3">
                       <button
                      onClick={() => handleDecrement(item.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-2">{item.qty ?? 1}</span>
                    <button
                      onClick={() => {
                        if ((item.qty ?? 1) < item.stock) {
                          handleIncrement(item.id);
                        } else {
                          showToast("Out of stock", "error");
                        }
                      }}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={(item.qty ?? 1) >= item.stock}
                    >
                      +
                    </button>

                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{((Number(item.price) || 0) * (item.qty ?? 1)).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:text-red-700 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No items in checkout.</p>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
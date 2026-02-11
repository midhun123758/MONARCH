import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);

  if (!user) {
    return <div className="p-6 text-center">Please log in</div>;
  }

  const formatPrice = (value) =>
    (Number(value) || 0).toLocaleString("en-IN");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item) => {
          const qty = item.quantity;
          const subtotal = Number(item.product_price) * qty;

          return (
            <div
              key={item.id}
              className="flex gap-4 border p-4  shadow mb-4"
            >
              <img
                src={item.img1 || item.img || "https://via.placeholder.com/150"}
                alt={item.product_name}
                className="w-32 h-32 object-cover "
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {item.product_name}
                </h2>

                <p className="text-gray-600">
                  ₹{formatPrice(subtotal)}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() =>
                      decrementQuantity(item.id, qty)
                    }
                    className="px-3 py-1 bg-black text-white "
                  >
                    -
                  </button>

                  <span>{qty}</span>

                  <button
                    onClick={() =>
                      incrementQuantity(item.id, qty, item.stock)
                    }
                    disabled={qty >= item.stock}
                    className="px-3 py-1 bg-black text-white disabled:opacity-50"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 bg-black text-white "
                  >
                    Remove
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Stock left: {item.stock}
                </p>
              </div>
            </div>
          );
        })
      )}

      {cart.length > 0 && (
        <button
          onClick={() => navigate("/buy")}
          className="mt-6 px-6 py-2 bg-black text-white "
        >
          Checkout
        </button>
      )}
    </div>
  );
}

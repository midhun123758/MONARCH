import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const formatPrice = (value) =>
    (Number(value) || 0).toLocaleString("en-IN");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold">Please log in</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Cart</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-[60vh]">
            <h2 className="text-3xl font-bold mb-4">
              Your Cart is Empty
            </h2>

            <Link
              to="/explore"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => {
                const qty = item.quantity;
                const subtotal =
                  Number(item.product_price) * qty;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md border border-gray-100 p-4 flex gap-6"
                  >
                    <img
                      src={item.product_img1}
                      alt={item.product_name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {item.product_name}
                        </h2>

                        <p className="text-gray-600 mt-1 font-bold">
                          ₹{formatPrice(subtotal)}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Stock left: {item.stock}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() =>
                            decrementQuantity(item.id, qty)
                          }
                          className="px-3 py-1 bg-black text-white rounded"
                        >
                          -
                        </button>

                        <span className="font-medium">
                          {qty}
                        </span>

                        <button
                          onClick={() =>
                            incrementQuantity(
                              item.id,
                              qty,
                              item.stock
                            )
                          }
                          disabled={qty >= item.stock}
                          className="px-3 py-1 bg-black text-white rounded disabled:opacity-50"
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="ml-4 text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-right">
              <button
                onClick={() => navigate("/buy")}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Navigate,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function CartPage() {
  const nav=useNavigate()
  const {
    user,
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useContext(CartContext);

  const userId = user?.id || user;

  if (!userId) return <div className="p-6 text-center">Please log in</div>;

  const formatPrice = (value) => {
    const n = Number(value) || 0;
    return n.toLocaleString("en-IN");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white w-[full] h-[30px]"></div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {(!Array.isArray(cart) || cart.length === 0) ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.map((item) => {
            const qty = item.qty ?? 1;
            const priceNum = Number(item.price) || 0;
            const subtotal = priceNum * qty;
            return (
              <div key={item.id} className="flex gap-4 border p-4 rounded-lg shadow">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                     <h2 className="text-lg font-semibold">{item.stock}</h2>
                    <p className="text-gray-600">₹{formatPrice(subtotal)}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black"
                    >
                      -
                    </button>
                    <span className="px-2">{qty}</span>
                    <button
                      onClick={() => {
                        if (qty < item.stock) {
                          incrementQuantity(item.id);
                        } else {
                          toast.error("Out of stock");
                        }
                      }}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={qty >= item.stock}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-white hover:text-black"
                    >
                      Remove
                    </button>

                   
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Summary */}
      {Array.isArray(cart) && cart.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Items</span>
            <span>
              {cart.reduce((sum, item) => sum + (item.qty ?? 1), 0)}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total Price</span>

            
            <span>
              ₹{formatPrice(cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty ?? 1), 0))}
            </span>
          </div>
        </div>
      )} <button className="px-3 py-1 bg-black text-white rounded hover:bg-green-700" onClick={()=>nav("/buy")}>
                      Checkout
                    </button>

      <div className="bg-white w-[full] h-[30vh]"></div>
      
    </div>
  );
}

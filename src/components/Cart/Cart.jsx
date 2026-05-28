import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../Slices/CartSlice";

import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-2xl font-semibold">
        Your Cart is Empty 🛒
      </div>
    );
  }

  const handleCheckOut = async() => {
    navigate('/checkout', {
      state:{
        cartItems,
        totalPrice
      }
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col gap-6">

        {cartItems.map((item) => (
          <div
            key={item.prodId}
            className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
          >
            
            {/* Product Info */}
            <div className="flex items-center gap-4">

              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Stock: {item.stock}</h2>
                {/* <p className="text-gray-600">₹{item.price}</p> */}
              </div>

            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => dispatch(decreaseQuantity(item.prodId))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.prodId))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>

            </div>

            {/* Total Item Price */}
            <div className="font-semibold">
              ₹{item.price * item.quantity}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => dispatch(removeFromCart(item.prodId))}
              className="text-red-500 font-medium"
            >
              Remove
            </button>

          </div>

          
        ))}

      </div>

      {/* Cart Summary */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Total: ₹{totalPrice}
        </h2>

        <div className="flex gap-4">

          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Cart
          </button>

          <button className="px-6 py-2 bg-green-500 text-white rounded"
            onClick={handleCheckOut}
          >
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Cart;
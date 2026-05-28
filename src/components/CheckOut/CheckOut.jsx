import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart, decreaseQuantity } from '../../Slices/CartSlice';

function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.auth)
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.paymentMethod === "COD") {
    //   console.log("Order Data:", formData, cartItems);
    //   const res = await axios.post('http://localhost:5000/checkout', { _id, formData, cartItems, totalPrice }, {
    //     withCredentials: true,
    //   })
    //   console.log(res)
    //   if (res?.data?.success) {
    //     toast.success(res?.data?.message)
    //     setFormData({
    //       name: "",
    //       address: "",
    //       paymentMethod: ""
    //     })
    //     dispatch(clearCart())
    //     setTimeout(() => {
    //       navigate('/')
    //     }, 1000);

    //   }

    // } else {
      try {

        const { data } = await axios.post('http://localhost:5000/checkout/razorpay/create-order', { amount: totalPrice }, {
          withCredentials: true,
        })
        console.log(data)
        const order = data.order;

        // 2. Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {

          const options = {
            key: "rzp_test_SXo9Y1bfOkNEmm", // 🔥 put your test key
            amount: order.amount,
            currency: "INR",
            name: "Your Store",
            description: "Order Payment",
            order_id: order.id,

            handler: async function (response) {
              // ✅ Payment success
              console.log(response,"response for payment")
              await axios.post(
                "http://localhost:5000/checkout",
                {
                  _id,
                  formData,
                  cartItems,
                  totalPrice,
                  paymentId: response.razorpay_payment_id
                },
                { withCredentials: true }
              );

              toast.success("Payment Successful 🎉");
              dispatch(clearCart());
              navigate("/");
            },

            prefill: {
              name: formData.name,
            },

            theme: {
              color: "#cda454",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        };

      } catch (error) {
        console.log(error);
        toast.error("Payment failed");
      }
    // }

  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE - CART SUMMARY */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[#cda454] mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">

            {cartItems.map((i) => (
              <div
                key={i.prodId}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={`http://localhost:5000${i.image}`}
                  alt={i.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{i.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Qty: {i.quantity}
                  </p>
                </div>

                <p className="font-semibold text-[#cda454]">
                  ₹{i.price * i.quantity}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#cda454]">₹{totalPrice}</span>
          </div>
        </div>

        {/* RIGHT SIDE - ADDRESS FORM */}
        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-2xl font-bold text-[#cda454] mb-6">
            Shipping Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <input type="hidden" name="amount" value={totalPrice}/> */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#cda454] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#cda454] outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#cda454] outline-none"
                required
              >
                <option value="">Select payment method</option>
                {/* <option value="COD">Cash on Delivery</option> */}
                <option value="PP">Online Payment</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#cda454] text-white py-3 rounded-lg font-semibold hover:bg-[#b89340] transition"
            >
              Place Order
            </button>

          </form>
        </div>

      </div>

    </>
  );
}

export default CheckOut;
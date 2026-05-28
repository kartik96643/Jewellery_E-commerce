import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function MyOrders() {

  const { _id } = useSelector(state => state.auth)
  const [orders, setOrders] = useState([])

  async function fetchOrders(id) {
    try {
      const res = await axios.get(`http://localhost:5000/my-orders/${id}`, {
        withCredentials: true,
      })

      if (res?.data?.success) {
        setOrders(res?.data?.orders)
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message)
      }
    } catch (error) {
      toast.error("Failed to fetch orders")
    }
  }

  useEffect(() => {
    if (_id) fetchOrders(_id)
  }, [_id])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-center text-[#cda454] mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't placed any orders yet 🛒
        </p>
      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border"
            >

              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b pb-4">

                <div>
                  <p className="font-semibold text-lg">{order.Date.split("T")[0]}</p>
                  <p className="font-semibold text-lg">{order.name}</p>
                  <p className="text-gray-500 text-sm">{order.address}</p>
                </div>

                <div className="mt-2 md:mt-0 text-right">
                  <p className="font-bold text-[#cda454] text-lg">
                    ₹{order.totalPrice}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.paymentMethod}
                  </p>
                </div>

              </div>

              {/* Products */}
              <div className="space-y-4">

                {order.products.map((p, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                  >

                    <div>
                      <p className="font-medium">
                        Product ID: {p.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Seller: {p.seller}
                      </p>
                    </div>

                    <div className="text-right">
                      <p>Qty: {p.quantity}</p>
                      <p className="font-semibold text-[#cda454]">
                        ₹{p.price}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center border-t pt-4">

                <span className="text-sm text-gray-500">
                  Order ID: {order._id}
                </span>

                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                  Placed
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default MyOrders
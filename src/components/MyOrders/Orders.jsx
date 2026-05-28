import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Orders = () => {

    const {_id} = useSelector(state => state.auth)
    const [data, setData] = useState([])
    // const [products, setProducts] = useState([])

    const fetchOrders = async() => {
        const res = await axios.get(`http://localhost:5000/my-orders/sell/${_id}`, {withCredentials:true} )
        console.log(res)
        if(res?.data?.success){
            // console.log(res?.data?.orders.flatMap((o) => o.products.filter((d) => d.seller == _id)))
            setData(res?.data?.orders)
            // setProducts(res?.data?.orders.flatMap((o) => o.products.filter((d) => d.seller == _id)))

        }else{
            toast.error(res?.data?.message)
            console.log("ERROR")
        }
    }
    useEffect(() => {
        fetchOrders()
    },[])

 return (
  <div className="max-w-6xl mx-auto px-6 py-10">

    <h2 className="text-3xl font-bold text-center mb-10 text-[#cda454]">
      Seller Orders
    </h2>

    {data && data.length > 0 ? (
      <div className="grid gap-6">

        {data.map((d) => (
          <div
            key={d._id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition"
          >

            {/* Top Row */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
              <p className="text-sm text-gray-500">
                📅 {d.Date.split("T")[0]}
              </p>

              <p className="text-sm text-gray-500">
                💳 Payment ID: {d.paymentId}
              </p>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#cda454]">
                👤 {d.name}
              </h3>
              <p className="text-gray-600 text-sm">
                📍 {d.address}
              </p>
            </div>

            {/* Product Info */}
           <div className="border-t pt-4 flex flex-col gap-4">

  {d.products.map((p, index) => (

    <div
      key={index}
      className="flex justify-between items-center flex-wrap gap-4 bg-gray-50 p-4 rounded-lg"
    >

      <div>
        <p className="text-sm text-gray-500">Product</p>
        <p className="font-semibold">{p.name}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Quantity</p>
        <p className="font-semibold">{p.quantity}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Price</p>
        <p className="font-semibold text-[#cda454]">
          ₹{p.price}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Total</p>
        <p className="font-bold text-lg text-[#cda454]">
          ₹{p.price * p.quantity}
        </p>
      </div>

    </div>

  ))}

</div>

          </div>
        ))}

      </div>
    ) : (
      <div className="text-center text-[#cda454] text-lg font-semibold mt-10">
        📦 No orders available
      </div>
    )}

  </div>
);
}

export default Orders

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function MyProducts() {

    const { _id, role } = useSelector(state => state.auth)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    async function getProd() {

        const res = await axios.get(`http://localhost:5000/product/mine/${_id}`, {
            withCredentials: true,
        })
        if(res?.data?.success){
            console.log(res?.data)
            setData(res?.data?.prod)
            console.log("PR", res?.data?.prod[0]?.reviews?.length)
        }
    }


    useEffect(() => {
        getProd()
    }, [])

    
    const handleViewClick = (id) => {
      navigate(`/product/view/${id}`)
    }

    const handleEditClick = async(id) => {
      navigate('/product/add',{
        state:{
          id,
        }
      })
    }

    const handleDeleteClick = async(id) => {
      try {
        const ans = confirm("Are you sure you want to delete this product?")
        if(ans){
          const res = await axios.post(`http://localhost:5000/product/delete/${id}`,{},{
            withCredentials:true,
          })
          console.log(res)
          if(res?.data?.success){
            toast.success(res?.data?.message)
            setData((prev) => prev.filter((item) => item._id !== id))
          }
        }
      } catch (error) {
        toast.error(error.response.message)
      }
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

      {data.length === 0 && (
        <p className="text-center text-[#cda454]">No products available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       {data.map((prod) => (
          <div
            key={prod._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={`http://localhost:5000${prod.images[0]}`}
                alt={prod.title}
                className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-2">

              <h3 className="text-lg font-semibold text-[#cda454] line-clamp-1">
                {prod.title}
              </h3>
              <h3 className="text-lg font-semibold text-[#cda454] line-clamp-1">
               ⭐ { (prod.reviews.length > 0) ? ((prod.reviews.reduce((acc, rv)=> acc + rv.rating,0))/(prod.reviews.length)) : 0}
              </h3>

              <p className="text-sm text-gray-500 capitalize">
                {prod.description} | {prod.stock < 1 ? 'Out of Stock' : `${prod.stock} in stock`}
              </p>

              {/* Price */}
              <div className="flex justify-between items-center mt-2">

                <span className="text-xl font-bold text-[#cda454]">
                  ₹{prod.price}
                </span>

                <button
                  onClick={() => handleViewClick(prod._id)}
                  className="text-sm text-[#cda454] hover:underline cursor-pointer"
                >
                  View
                </button>

              </div>


              {/* Admin Buttons */}
              {( (role && (role !== 'CUSTOMER')) && _id === prod.seller )&& <>
              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => handleEditClick(prod._id)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 text-sm cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteClick(prod._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm cursor-pointer"
                >
                  Delete
                </button>

              </div>
              </>
              }
              

            </div>
          </div>
        ))}
       </div>
       </div>
    )

}

export default MyProducts

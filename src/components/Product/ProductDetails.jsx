import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCart from "../AddToCart/AddToCart";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ProductDetails() {
  const {role} = useSelector((state) => state.auth)
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  let user
  useEffect(() => {
    getProduct();
    user = localStorage.getItem('userId')
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: ""
  })


  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`);
      console.log("Response", res)
      if (res.data.success) {
        setProduct(res.data.product);
        toast.success(res?.data?.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in fetching this product")
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Product...
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value

    })
  }

  const handleSubmit = async (e, id) => {
    e.preventDefault()

    const user = localStorage.getItem("userId")

    const data = {
      user,
      name: formData.name,
      rating: formData.rating,
      comment: formData.comment
    }

    console.log(data)
    const res = await axios.post(`http://localhost:5000/product/${id}`, data)
    console.log(res)
    if(res?.data?.success){
      toast.success(res?.data?.message)
    }

  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">

        {/* PRODUCT IMAGE */}
        <div>
          <img
            src={`http://localhost:5000${product.images[0]}`}
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div>

          <h1 className="text-3xl font-bold text-[#cda454] mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <div className="space-y-3 text-lg">

            <p>
              <span className="font-semibold">Price:</span> ₹{product.price}
            </p>

            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>

            <p>
              <span className="font-semibold">Metal:</span> {product.brand}
            </p>

            <p>
              <span className="font-semibold">In stock:</span> {product.stock}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ { (product.reviews.length > 0) && (product.reviews.reduce((acc, rv)=> acc + rv.rating,0))/(product.reviews.length)}

            </p>
          </div>
          {(role && (role === 'CUSTOMER')) && <div className="mt-3">
            <AddToCart
              prodId={product._id}
              price={product.price}
              name={product.title}
              image={product.images[0]}
            />
          </div>
          }
          
        </div>

      </div>

      <div className="mt-12 ml-[20%] max-w-2xl">

        <h2 className="text-2xl font-bold text-[#cda454] text-center mb-6">
          Write a Review
        </h2>

        <form
          onSubmit={(e) => handleSubmit(e, product._id)}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rating (1–5)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Comment
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#cda454] text-white px-6 py-2 rounded-lg hover:bg-[#b89340] transition"
          >
            Submit Review
          </button>

        </form>
      </div>

      <div className="mt-12">

        <h2 className="text-2xl text-center font-bold mb-6 text-[#cda454]">
          Customer Reviews ({product?.reviews?.length})
        </h2>

        {product?.reviews?.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (

          <div className="space-y-4">

            {product?.reviews.map((review) => (

              <div
                key={review._id}
                className="bg-white shadow-sm border rounded-lg p-4"
              >

                <div className="flex justify-between items-center mb-2">

                  <p className="font-semibold text-gray-800">
                    {review.name}
                  </p>

                  <span className="text-yellow-500 font-medium">
                    ⭐ {review.rating} / 5
                  </span>

                </div>

                <p className="text-gray-600">
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>


    </div>
  );
}

export default ProductDetails;
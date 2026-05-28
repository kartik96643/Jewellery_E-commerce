import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToCart from "../AddToCart/AddToCart";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


function ProductCard() {
  const { role, _id } = useSelector(state => state.auth)
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("")
  const [sortedData, setSortedData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category')
  const metal = searchParams.get('metal')
  const navigate = useNavigate()

  const fetchdata = async () => {
    try {

      let url = `http://localhost:5000/product?limit=8&page=${page}`;

      if (category) {
        url += `&category=${category}`;
      }

      if (metal) {
        url += `&metal=${metal}`
      }

      const res = await axios.get(url, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        setData(res?.data?.products);
        setSortedData(res?.data?.products)
        setTotalPages(res?.data?.totalPages)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page, category, metal]);

  useEffect(() => {
    console.log(sortType)
    if (!sortType) return

    let sortData = [...sortedData]

    switch (sortType) {
      case 'PLH':
        sortData.sort((a, b) => a.price - b.price)
        break;

      case 'PHL':
        sortData.sort((a, b) => b.price - a.price)
        break;

      case 'RLH':
        sortData.sort((a, b) => {
          const avgA = a.reviews.length ? (a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length) : 0
          const avgB = b.reviews.length ? (b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length) : 0
          return avgA - avgB
        })
        break;

      case 'RHL':
        sortData.sort((a, b) => {
          const avgA = a.reviews.length ? (a.reviews.reduce((acc, r) => acc + r.rating, 0) / a.reviews.length) : 0
          const avgB = b.reviews.length ? (b.reviews.reduce((acc, r) => acc + r.rating, 0) / b.reviews.length) : 0
          return avgB - avgA
        })
        break;

      default:
        break;

    }
    setSortedData(sortData)

  }, [sortType])

  const handleEditClick = async (id) => {
    navigate('/product/add', {
      state: {
        id
      }
    })
  };
  const handleViewClick = async (id) => {
    navigate(`/product/view/${id}`)
  };

  const handleDeleteClick = async (id) => {
    console.log(data, "data")
    const ans = confirm("Are you sure you want to delete?");
    if (ans) {
      const res = await axios.post(`http://localhost:5000/product/delete/${id}`, {}, {
        withCredentials: true
      });
      console.log(res, "delete res")
      toast.success(res?.data?.message)
      setData((prev) => prev.filter(item => item._id !== id))
      setSortedData((prev) => prev.filter(item => item._id !== id))
    }
  };

  const handleChange = (e) => {
    setSortType(e.target.value)
  }



  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-3xl font-bold text-center mb-10 text-[#cda454]">
        {category ? `${category} Collection` : `All Jewellery Collection`}
      </h2>




      <select name="sort" id="sort" onChange={handleChange} value={sortType} className="mb-8">
        <option value="">Sort By</option>
        <option value="PLH">Price(Low to high)</option>
        <option value="PHL">Price(High to low)</option>
        <option value="RLH">Rating(Low to high)</option>
        <option value="RHL">Rating(High to low)</option>
      </select>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {(sortType == "") ? ((data.length > 0) ? data.map((prod) => (
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
                ⭐ {(prod.reviews.length > 0) ? (prod.reviews.reduce((acc, rv) => acc + rv.rating, 0)) / (prod.reviews.length) : 0}
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
                  className="text-sm text-[#cda454] hover:underline"
                >
                  View
                </button>

              </div>

              {/* Add To Cart */}

              {(role && (role === 'CUSTOMER')) && <>
                <div className="mt-3">
                  <AddToCart
                    prodId={prod._id}
                    price={prod.price}
                    name={prod.title}
                    image={prod.images[0]}
                    stock={prod.stock}
                  />
                </div>
              </>}



              {/* Admin Buttons */}
              {((role && (role !== 'CUSTOMER')) && _id === prod.seller) && <>
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleEditClick(prod._id)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(prod._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                </div>


              </>
              }
               {((role && (role === 'ADMIN'))) && <>
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleDeleteClick(prod._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                </div>
              </>
              }


            </div>
          </div>
        )) : (data.length === 0 && (
          <p className="col-span-full text-center text-[#cda454] text-lg font-semibold">
            No products available
          </p>
        ))) : ((sortedData.length > 0) ? sortedData.map((prod) => (
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
                ⭐ {(prod.reviews.length > 0) ? (prod.reviews.reduce((acc, rv) => acc + rv.rating, 0)) / (prod.reviews.length) : 0}
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
                  className="text-sm text-[#cda454] hover:underline"
                >
                  View
                </button>

              </div>

              {/* Add To Cart */}

              {(role && (role !== 'SELLER')) && <>
                <div className="mt-3">
                  <AddToCart
                    prodId={prod._id}
                    price={prod.price}
                    name={prod.title}
                    image={prod.images[0]}
                    stock={prod.stock}
                  />
                </div>
              </>}

              {/* Admin Buttons */}
              {((role && (role !== 'CUSTOMER')) && _id === prod.seller) && <>
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleEditClick(prod._id)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(prod._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                </div>
              </>
              }
              {((role && (role === 'ADMIN'))) && <>
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleDeleteClick(prod._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                </div>
              </>
              }


            </div>
          </div>
        )) : sortedData.length === 0 && (
          <p className="col-span-full text-center text-[#cda454] text-lg font-semibold">
            No products available
          </p>
        ))}


      </div>
      <div className="flex justify-center items-center mt-12 gap-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-5 py-2 rounded-full border transition 
      ${page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#cda454] border-[#cda454] hover:bg-[#cda454] hover:text-white"
            }`}
        >
          ← Prev
        </button>

        <span className="px-4 py-2 rounded-full bg-[#cda454] text-white font-semibold shadow">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-5 py-2 rounded-full border transition 
      ${page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-[#cda454] border-[#cda454] hover:bg-[#cda454] hover:text-white"
            }`}
        >
          Next →
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
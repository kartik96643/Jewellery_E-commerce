import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: null,
  });


  const [isEditingId, setIsEditingId] = useState(false)
  const location = useLocation();
  const id = location?.state?.id;

  async function getProd(id) {
    try {
      const res = await axios.get(`http://localhost:5000/product/${id}`,{
        withCredentials:true,
      });
      console.log(res)
      if (res?.data?.success) {
        const product = res?.data?.product;
        console.log("Product", product)
        setFormData({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          brand: product.brand || "",
          stock: product.stock || "",
          image: null, // don't preload file input
        });

      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log("Updated FormData:", formData);
  }, [formData]);

  useEffect(() => {
    if (id) {
      setIsEditingId(true);
      getProd(id);
    }
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);
    data.append("image", formData.image);

      for (let pair of data.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
      let res;
      if (isEditingId) {
        res = await axios.post(`http://localhost:5000/product/edit/${id}`, data, {withCredentials:true});
        // toast(res?.data?.message)
        // alert(`Product updated successfully!`);
      } else {
        res = await axios.post("http://localhost:5000/product/add", data, {withCredentials:true});
        // alert(`Product added successfully!`);
        // toast(res?.data?.message)

      }

      console.log(res.data);
        toast.success(res?.data?.message)



      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        image: null,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      // alert("Failed to add product");
      toast.error(res?.data?.message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#cda454]">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Metal</label>
            {/* <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-fuchsia-400 outline-none"
            /> */}
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              required
            >
              <option value="">Select Metal</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Diamond">Diamond</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            {/* <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-fuchsia-400 outline-none"
              required
            /> */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#cda454] outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Anklets">Anklets</option>
              <option value="Mangalsutra">Mangalsutra</option>
              <option value="Earrings">Earrings</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#cda454] text-white py-3 rounded-md font-semibold hover:bg-[#a88745] transition"
            >
              {isEditingId ? 'Save' : 'Add Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;

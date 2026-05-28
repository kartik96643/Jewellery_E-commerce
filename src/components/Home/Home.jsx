import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  const categories = [
    { name: "Rings", image: "https://images.unsplash.com/photo-1599458349289-18f0ee82e6ed?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Necklaces", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Earrings", image: "https://images.unsplash.com/photo-1611653842967-39eb011b2ca3?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Bracelets", image: "https://images.unsplash.com/photo-1633810543462-77c4a3b13f07?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Anklets", image: "https://images.pexels.com/photos/28573577/pexels-photo-28573577.jpeg" },
    { name: "Mangalsutra", image: "https://images.pexels.com/photos/4960230/pexels-photo-4960230.jpeg" },
  ];

  const metals = [
    {name: "Gold", image: "https://plus.unsplash.com/premium_photo-1674748386072-f9774f2c21d1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {name: "Silver", image:"https://plus.unsplash.com/premium_photo-1674748384594-47e6b69793fe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {name: "Platinum", image:"https://plus.unsplash.com/premium_photo-1673285097459-2d980192ce04?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {name: "Diamond", image:"https://images.unsplash.com/photo-1629201688905-697730d24490?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
  ]

  const handleCategoryClick = (category) => {
    navigate(`/product?category=${category}`);
  };

  const handleMetalClick = (metal) => {
    navigate(`/product?metal=${metal}`);
  };



  return (
    <div>

      {/* HERO SECTION */}
      <div className="relative w-full h-[500px]">

        <img
          src="https://plus.unsplash.com/premium_photo-1708711288213-1726e476ce74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Jewellery"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">

          <h1 className="text-[#cda454] text-4xl md:text-5xl font-bold mb-6">
            Discover Elegant Jewellery
          </h1>

          <button
            onClick={() => navigate("/product")}
            className="bg-white hover:bg-grey text-[#cda454] px-6 py-3 rounded-lg text-lg font-semibold transition cursor-pointer"
          >
            Explore Collections
          </button>

        </div>
      </div>


      {/* CATEGORY SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-10 text-center text-[#cda454]">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer group"
            >

              <div className="overflow-hidden rounded-lg shadow-md">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-40 w-full object-cover group-hover:scale-110 transition duration-300"
                />

              </div>

              <h3 className="text-center mt-3 font-semibold text-[#cda454]">
                {cat.name}
              </h3>

            </div>
          ))}

        </div>

      </div>

      {/* { Shop by metal} */}

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-10 text-center text-[#cda454]">
          Shop by Metal
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {metals.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleMetalClick(cat.name)}
              className="cursor-pointer group"
            >

              <div className="overflow-hidden rounded-lg shadow-md">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-40 w-full object-cover group-hover:scale-110 transition duration-300"
                />

              </div>

              <h3 className="text-center mt-3 font-semibold text-[#cda454]">
                {cat.name}
              </h3>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;
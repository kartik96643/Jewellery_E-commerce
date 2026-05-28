import React from "react";

function ProductCardSkeleton() {
  return (
   <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">

      {/* Heading */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-10"></div>

      {/* Sort dropdown */}
      <div className="h-10 bg-gray-300 rounded w-40 mb-8"></div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-4">

            {/* Image */}
            <div className="h-64 w-full bg-gray-300 rounded mb-4"></div>

            {/* Title */}
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>

            {/* Rating */}
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>

            {/* Description */}
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>

            {/* Price + Button */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
            </div>

            {/* Button */}
            <div className="h-10 bg-gray-300 rounded mt-4"></div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductCardSkeleton;
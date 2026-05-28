import React from "react";

function MyOrdersSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">

      {/* Title */}
      <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-10"></div>

      {/* Order Cards */}
      <div className="space-y-8">

        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b pb-4">
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                <div className="h-5 w-40 bg-gray-300 rounded"></div>
                <div className="h-4 w-52 bg-gray-200 rounded"></div>
              </div>

              <div className="mt-2 md:mt-0 space-y-2">
                <div className="h-5 w-20 bg-gray-300 rounded ml-auto"></div>
                <div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {[1, 2].map((_, j) => (
                <div
                  key={j}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>

                  <div className="space-y-2 text-right">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyOrdersSkeleton;
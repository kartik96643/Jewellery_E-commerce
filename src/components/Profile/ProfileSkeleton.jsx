import React from "react";

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 animate-pulse">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <div className="h-6 w-40 bg-gray-300 rounded mt-4"></div>
          <div className="h-4 w-52 bg-gray-200 rounded mt-2"></div>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Details */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>

      </div>
    </div>
  );
}

export default ProfileSkeleton;
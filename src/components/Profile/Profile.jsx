import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {

    const [profileData, setProfileData] = useState({})
    const {_id} = useSelector(state => state.auth) 
    const navigate = useNavigate()
    const getProfile = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/profile/${_id}`,{
                withCredentials:true,
            })
            console.log("profile res",res)
            if(res?.data?.success){
                setProfileData(res?.data?.profile)
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.message)
        }
    }

    useEffect(() => {
        console.log(_id)
        if(_id) getProfile()
    },[])

    const handleBack = () => {
        navigate('/')
    }

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">

      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-[#cda454] flex items-center justify-center text-white text-3xl font-bold shadow-md">
          {profileData?.userName?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {profileData?.userName?.charAt(0)?.toUpperCase() + profileData?.userName?.slice(1) || "User"}
        </h2>

        <p className="text-gray-500 text-sm">
          {profileData?.email || "No Email"}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t my-6"></div>

      {/* Profile Details */}
      <div className="space-y-4">

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Username</span>
          <span className="font-semibold text-gray-800">
            {profileData?.userName?.charAt(0)?.toUpperCase() + profileData?.userName?.slice(1) || "User"}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Email</span>
          <span className="font-semibold text-gray-800">
            {profileData?.email}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Role</span>
          <span className="font-semibold text-gray-600 capitalize">
            {profileData?.role}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Joined At</span>
          <span className="font-semibold text-gray-600 capitalize">
            {profileData?.createdAt?.split('T')[0] || "Not Define"}
          </span>
        </div>

      </div>

      {/* Button Section */}
      <div className="mt-6 flex gap-3">

        <button onClick= {handleBack} 
         className="flex-1 bg-[#cda454] text-white py-2 rounded-lg hover:bg-[#b89340] transition">
          Back to home
        </button>

       

      </div>

    </div>

  </div>
);
}

export default Profile

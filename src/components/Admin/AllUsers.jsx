import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function AllUsers() {

    const [users, setUsers] = useState([])

    const fetchUsers = async() => {
        const res = await axios.get('http://localhost:5000/admin/getAllUsers')
        console.log(res)
        if(res?.data?.success){
            setUsers(res?.data?.users)
            toast.success(res?.data?.message)
        }else{
            toast.error(res?.data?.message)
        }
    }

    useEffect(()=> {
        fetchUsers()
    }, [])
 return (
  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* Heading */}
    <h2 className="text-3xl font-bold text-center mb-10 text-[#cda454]">
      All Users ({users.length})
    </h2>

    {/* Users */}
    {users && users.length > 0 ? (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border overflow-hidden"
          >

            {/* Top Section */}
            <div className="bg-[#cda454] px-6 py-4">
              <h3 className="text-xl font-semibold text-white capitalize">
                {user.userName}
              </h3>
            </div>

            {/* User Details */}
            <div className="p-6 flex flex-col gap-4">

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-700 break-words">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>

                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mt-1
                    ${user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : user.role === "SELLER"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {user.role}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined at: </p>
                <p className="font-medium text-gray-700 break-words">
                     {user.createdAt.split('T')[0]}

                </p>
              </div>

            </div>

          </div>
        ))}

      </div>

    ) : (

      <div className="text-center text-[#cda454] text-lg font-semibold mt-10">
        👤 No users available
      </div>

    )}
  </div>
)
}

export default AllUsers

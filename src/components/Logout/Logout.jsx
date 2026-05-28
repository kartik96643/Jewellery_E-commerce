import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Slices/CartSlice";
import { toast } from "react-toastify";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [message, setMessage] = useState("");
  // const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/logout");

      localStorage.removeItem("token");
      dispatch(clearCart())
      dispatch(logout());

      if (res?.data?.success) {
        // setSuccess(true);
        // setMessage(res.data.message);
        toast.success(res.data.message)
        navigate("/user/signin");
      }
    } catch (error) {
      console.error(error);
      toast.error(res.data.message)
    }
  };

  return (
    <li>
      <button onClick={handleClick} className="cursor-pointer text-[#cda454] hover:text-[#a88745]">
        Logout
      </button>
    </li>
  );
}

export default Logout;

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";
import Cart from "../Cart/Cart";

const Header = () => {
  const [open, setOpen] = useState(false);
  const {user,token,role,isLoggedIn} = useSelector(state => state.auth)
  console.log("isLoggedIn",isLoggedIn)
  console.log("isUser",user)
  console.log("isToken",token)
  console.log("Role",role)

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl text-[#cda454] font-bold text-dark tracking-wide">
          KIRA
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-dark font-medium">
         {!isLoggedIn && <>
         <li>
            <NavLink
              to="/user/signup"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-white pb-1" : "hover:text-[#a88745] text-[#cda454]"
              }
            >
              Sign Up
            </NavLink>
          </li>
 
         <li>
            <NavLink
              to="/user/signin"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-white pb-1" : "hover:text-[#a88745] text-[#cda454]"
              }
            >
              Login
            </NavLink>
          </li>
          </>  } 

          {isLoggedIn && <>


          <li>
            <NavLink
              to="/"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              Home
            </NavLink>
          </li>
          
          {(role && (role === 'CUSTOMER')) && <>
          <li>
            <NavLink
              to="/cart"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-orders/:id"
              className="hover:text-[#a88745] text-[#cda454]"
              prefetch="intent"
            >
              Orders
            </NavLink>
          </li>
          </>}
          <li>
            <NavLink
              to="/contact"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              Contact Us
            </NavLink>
          </li>
          
          
          {/* <li>
            <NavLink
              to="/user/logout"
              className="hover:text-fuchsia-200"
              >
              Logout
            </NavLink>
          </li> */}
          <Logout/>

            <li>
            <NavLink
              to="/profile"
              className="hover:text-[#a88745] text-[#cda454]"
              prefetch="intent"
            >
              Profile
            </NavLink>
          </li>
          {(role && (role === 'ADMIN')) && <>
          
            <li>
            <NavLink
              to="/admin/getAllUsers"
              className="hover:text-[#a88745] text-[#cda454]"
              prefetch="intent"
            >
              All Users
            </NavLink>
          </li>
          </>}

                </>
            }

            {(isLoggedIn && (role === 'SELLER' )) && 
            <>
            <li>
            <NavLink
              to="/product/add"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              Add Product
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/product/mine/:id"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              My Products
            </NavLink>
          </li>
            <li>
            <NavLink
              to="/my-orders/sell/:id"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              My Orders
            </NavLink>
          </li>
            </> }
             <li>
            <NavLink
              to="/about"
              className="hover:text-[#a88745] text-[#cda454]"
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#cda454] px-6 pb-4">
          <ul className="flex flex-col gap-4 text-white font-medium">
            {!isLoggedIn && <>
            <li>
              <NavLink to="/user/signup" onClick={() => setOpen(false)}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/signin" onClick={() => setOpen(false)}>
                Login
              </NavLink>
            </li>
            </>}
            <li>
              <NavLink to="/contact" onClick={() => setOpen(false)}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/logout" onClick={() => setOpen(false)}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;

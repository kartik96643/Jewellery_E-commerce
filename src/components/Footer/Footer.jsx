import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#4b3405] text-white mt-12">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-[#cda454] mb-2">
            KIRA
          </h2>
            <span className="text-[#cda454]">Timeless Elegance in Every Piece.</span>
          <p className="text-gray-300 text-sm">
            Discover timeless elegance with our handcrafted jewellery
            collections. Designed to shine for every special moment.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-[#cda454] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-[#cda454]">Home</Link></li>
            <li><Link to="/product" className="hover:text-[#cda454]">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-[#cda454]">Cart</Link></li>
            <li><Link to="/about" className="hover:text-[#cda454]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[#cda454]">Contact Us</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold text-[#cda454] mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>Rings</li>
            <li>Necklaces</li>
            <li>Earrings</li>
            <li>Bracelets</li>
            <li>Anklets</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-[#cda454] mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Email: support@kira.com</li>
            <li>Phone: +91 96643 98989</li>
            <li>Location: Jaipur, India</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} KIRA. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
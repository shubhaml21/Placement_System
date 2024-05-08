import { AiOutlineUser } from "react-icons/ai"; 
import React from "react";
import { Link } from "react-router-dom";
import Logo_placement from "../Assets/Logo_placement.png";
import { useSelector } from "react-redux";
import Profilepage from "../pages/Profilepage";
const Navbar = () => { 
const {token}=useSelector(state=>state.auth);


  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex   justify-between items-center">
          <div className="flex space-x-4 justify-center items-center">
            {/* logo */}

            <Link to="/">
              <div className="text-md flex justify-center items-center  font-normal w-40 mt-2">
                <img src={Logo_placement} alt="logo" />
              </div>
            </Link>

            {/* /logo */}

            {/* primary nav */}
            <div className="hidden md:flex items-center justify-center space-x-1">
              <a
                href="/"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Home
              </a>
              <a
                href="/about"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                About
              </a>
              <a
                href="/contact"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Contact
              </a>
            </div>
            {/* /primary nav */}
          </div>

          {/* secondary nav */}
          
          {
            token ===
            null &&
            <div className="hidden md:flex items-center space-x-1">
            <a href="/login" className="py-5 px-3">
              Login
            </a>
            <a
              href="/signup"
              className="py-2 px-3 bg-[#004085] text-white  rounded transition duration-300"
            >
              Signup
            </a>
          </div>

          } 
          { 
            token !==null && <Profilepage />
          }



         
          {/* mobile buttons */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          {/* /mobile buttons */}
        </div>
      </div>

      {/* mobile menu */}
      <div className="mobile-menu hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Home
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          About
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Contact
        </a>
      </div>
      {/* /mobile menu */}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast"

export default function Signup() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data)
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        // Assuming you have a toast notification library installed and properly configured

       

        toast.success("Signup Successful");
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      // Display user-friendly error message or notification here
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative max-h-[100vh] sm:h-[100%]  ">
      <div className="bg_image_signup absolute inset-0 z-0 " />
      <div className="bg-white shadow-md rounded-lg border-2 overflow-hidden w-full max-w-md opacity-100 z-2">
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl text-slate-950 mt-4 font-bold ">
            Student Register
          </h2>
          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4 ">
              {/* name */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your  full name"
                />
              </div>

              {/* enrollment number  */}
              <div>
                <label htmlFor="Enrollment" className="sr-only">
                  Enrollment Number
                </label>
                <input
                  id="Enrollment"
                  name="Enrollment"
                  onChange={handleChange}
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Enrollment Number"
                />
              </div>

              {/* email  */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Create Password"
                />
              </div>

              {/* confirm password */}
              <div>
                <label htmlFor="confirmpassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-700 hover:scale-[1.02] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
                <BsArrowRight className="text-xl ml-2" />
              </button>
            </div>
          </form>
          <div className="mt-2 w-full flex items-center justify-center">
            <div className="text-sm text-stone-800 text-center">
              Already Have a Account?{" "}
              <NavLink
                to="/login"
                className="text-lg text-green-800  cursor-pointer font-medium"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

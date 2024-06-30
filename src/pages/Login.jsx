import { BsArrowRight } from "react-icons/bs";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setToken, setUser } from "../slices/authSlice";
import Logo_placement from "../Assets/Logo_placement.png";
import SplashScreen from "./SplashScreen";


export default function Login() {
  const { token } = useSelector((state) => state.auth);
  const [loading,setLoading]=useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show the splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []); 


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        data
      );     
     


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
     
      if (response.status === 200) {
        toast.success("Login Successful");

        const user = response.data.user;
        const userImage = user.image
          ? user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${user.fullname}%20${user.fullname}`;
        dispatch(setUser({ ...user, image: userImage }));
        dispatch(setIsAuth(true)); 
        
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(user));
        if(response.data.user.role==="Admin"){
          localStorage.setItem("isAdmin", true);
        }
        dispatch(setToken(response.data.token));
        navigate("/dashboard/home");
      }
    } catch (error) { 
     
        toast.error("Invalid credential");
      console.error("Error:", error);
    }
  };   
  if (loading) {
    return <SplashScreen/>;
  }
 

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative max-h-[100vh] sm:h-[100%]  ">
      <div className="bg_image absolute inset-0 z-0 " />
      <div className="bg-white shadow-md rounded-lg border-2 overflow-hidden w-full max-w-md opacity-100 z-2">
        <div className="px-6 py-8">
          <div className="flex justify-center font-black">
          </div>
          <h2 className="text-center text-3xl text-slate-950 mt-4 font-bold ">
            Placement Portal
          </h2>
          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4 ">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer "
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-black font-bold ">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-900 hover:text-indigo-500 font-bold">
                  Forgot your password?
                </a>
              </div>
            </div> */}
            <div className="flex items-center justify-between">
              <div className="text-md flex justify-end w-full">
                <a
                  href="#"
                  className="font-medium text-indigo-900 hover:text-indigo-500 font-bold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-zinc-700 hover:scale-[1.02] transition-all duration-150  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
                <BsArrowRight className="text-xl  ml-2 " />
              </button>
            </div>
          </form>

          <div className="mt-2 w-full flex items-center justify-center">
            <div className="text-sm text-stone-800 text-center">
              Don't have account{" "}
              <div>
                <NavLink
                  to="/signup"
                  className="text-lg text-green-800  cursor-pointer font-medium"
                >
                  Sign-up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

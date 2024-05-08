import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import { jwtDecode } from "jwt-decode"; // Make sure to install jwt-decode package

import { Navigate, useNavigate } from 'react-router-dom';

const CheckAuth = () => {
   const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const id = localStorage.getItem('user');
       console.log(userId,"useridddd after decode token");
        // Your validation logic for user eligibility
        // For example, if the user is eligible, continue to the application
        // Otherwise, redirect them to the login page

        // Example validation logic (replace with your actual validation logic)
        if (userId === id) {
          // User is eligible, continue to the application
          // You can add your application logic here
      
          console.log("eligible ")
          // navigate("/dashboard/home");
        } else {
          // User is not eligible, redirect to login page
         <Navigate to={'login'} replace= {true}/>
        }
      } catch (error) {
        // Token decoding failed, redirect to login page
        console.error('Error decoding token:', error);
         navigate("/login");
      }
    } else {
      // No token found, redirect to login page
     navigate("/login")
    }
  }, [navigate]);

  return null; // Since this component only handles redirects, it doesn't render anything
};

export default CheckAuth;

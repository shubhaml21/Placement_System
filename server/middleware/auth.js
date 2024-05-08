const jwt = require("jsonwebtoken");
require("dotenv").config(); 

// const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {

      // Extract token from cookies, body, or Authorization header
      const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");


      // If token is missing, return 401 Unauthorized response
      if (!token) {
          return res.status(401).json({ success: false, message: "Token Missing" });
      }

      // Verify the JWT using the secret key stored in environment variables
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Storing the decoded JWT payload in the request object for further use
      req.user = decode;

      // Move on to the next middleware or request handler
      next();
  } catch (error) {
      // If there is an error during the authentication process, return 401 Unauthorized response 
      console.error("Error in authentication middleware:", error);
      return res.status(401).json({
          success: false,
          message: "Something Went Wrong While Validating the Token",
      });
  }
};





// exports.auth = async (req, res, next) => {
//   try {
//     // Extracting JWT from request cookies, body, or header
//     const token =
//       req.cookies.token ||
//       req.body.token ||
//       (req.headers.authorization && req.headers.authorization.replace("Bearer ", ''));

//     // If JWT is missing, return 401 Unauthorized response
//     if (!token) {
//       return res.status(401).json({ success: false, message: `Token Missing` });
//     }

//     try {
//       // Verifying the JWT using the secret key stored in environment variables
//       const decode = await jwt.verify(token, process.env.JWT_SECRET);
//       console.log(decode);
//       // Storing the decoded JWT payload in the request object for further use
//       req.user = decode;
//       // If JWT is valid, move on to the next middleware or request handler
//       next();
//     } catch (error) {
//       // If JWT verification fails, return 401 Unauthorized response
//       return res.status(401).json({ success: false, message: "Token is invalid" });
//     }
//   } catch (error) {
//     // If there is an error during the authentication process, return 401 Unauthorized response
//     return res.status(401).json({
//       success: false,
//       message: `Something Went Wrong While Validating the Token`,
//     });
//   }
// };







// isStudent
// exports.isStudent = async (req, res, next) => {
//   try {
//     if (req.user.accountType !== "Student") {
//       return res.status(401).json({
//         success: false,
//         message: "This is the protected route for the students only",
//       });
//     }
//     next();
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "role is not verified",
//     });
//   }
// };

// exports.isInstructor = async (req, res, next) => {
//   try{
//          if(req.user.accountType !== "Instructor") {
//              return res.status(401).json({
//                  success:false,
//                  message:'This is a protected route for Instructor only',
//              });
//          }
//          next();
//   }
//   catch(error) {
//      return res.status(500).json({
//          success:false,
//          message:'User role cannot be verified, please try again'
//      })
//   }
//  }


//isAdmin
// exports.isAdmin = async (req, res, next) => {
//   try{
//          if(req.user.accountType !== "Admin") {
//              return res.status(401).json({
//                  success:false,
//                  message:'This is a protected route for Admin only',
//              });
//          }
//          next();
//   }
//   catch(error) {
//      return res.status(500).json({
//          success:false,
//          message:'User role cannot be verified, please try again'
//      })
//   }
//  }

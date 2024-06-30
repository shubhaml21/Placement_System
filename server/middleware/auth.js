const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication middleware
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
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token has expired, please log in again.",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Invalid token, please log in again.",
          });
        }
      }

      // Storing the decoded JWT payload in the request object for further use
      req.user = decoded;
        
      

      // Move on to the next middleware or request handler
      next();
    });
  } catch (error) {
    // If there is an error during the authentication process, return 401 Unauthorized response 
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
}; 

exports.isAdmin = async (req, res, next) => {
  try{
         if(req.user.role !== "Admin") {
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for Admin only',
             });
         }
         next();
  }
  catch(error) {
     return res.status(500).json({
         success:false,
         message:'User role cannot be verified, please try again'
     })
  }
 }

// // adminController.js

// const User = require("../models/User");
// const UserDetails = require("../models/UserDetails");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // Function to create an admin user
// exports.createAdmin = async (req, res) => {
//   try {
//     const existingAdmin = await User.findOne({ email: "Vivek0190@gmail.com" });

//     if (existingAdmin) {
//       console.log("Admin already exists");
//       return res.status(400).json({ message: "Admin already exists" });
    
//     }
     

//     const hashedPassword = await bcrypt.hash("Vivek@123", 10);

//     // Create a mock UserDetails document or fetch existing details
//     let userDetails = await UserDetails.findOne({ /* Your conditions */ });
//     if (!userDetails) {
//       userDetails = new UserDetails({ /* Populate fields */ });
//       await userDetails.save();
//     }

//     const newAdmin = new User({
//       name: "Vivek Admin",
//       Enrollment: "123456", // Assuming this field is required
//       email: "vivek0190@gmail.com",
//       password: hashedPassword,
//       additionalDetails: userDetails._id,
//       role: "Admin",
//     });

//     const savedAdmin = await newAdmin.save();
//     console.log("Admin created successfully");

//     const token = jwt.sign(
//       { userId: savedAdmin._id, email: savedAdmin.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(201).json({
//       message: "Admin created successfully",
//       token: token,
//     });

//   } catch (err) {
//     console.error("Error creating admin:", err.message);
//     // Ensure `res` is accessible and correct
//     if (res && typeof res.status === "function") {
//       return res.status(500).json({ message: "Server error" });
//     } else {
//       console.error("Response object is not defined or not a function");
//       // Handle the error in a suitable manner, e.g., logging and returning a generic error response
//       return;
//     }
//   }
// };

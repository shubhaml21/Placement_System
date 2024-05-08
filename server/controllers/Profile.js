const User = require("../models/User");
const Profile = require("../models/UserDetails");
// const Profile =require("../models/UserDetails");
 
exports.updateProfile = async (req, res) => {
  try {
    const {
      fullname = "",
      email = "",
      branch = "",
      section = "",
      Enrollment = "",
      year = "",
      CGPA = "",
      tenth = "",
      twelth = "",
      backlog = "",
    } = req.body;

    const userId = req.user.id; // Access user ID from request object

    // Find the user and update its basic information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        Enrollment,
      },
      { new: true } // This option returns the updated document
    );

    // If the user is not found, send a 404 response
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }    

    const tenthValue = parseFloat(tenth);
    const twelthValue = parseFloat(twelth);
       
    // Find the user's profile and update its details
    const profile = await Profile.findByIdAndUpdate(
      updatedUser.additionalDetails,
      {
        branch,
        section,
        year,
        CGPA,
        tenth:tenthValue,
        twelth:twelthValue,
        backlog,
      },
      { new: true } // This option returns the updated document
    );

    // If the profile is not found, send a 404 response
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Populate the user details with the updated profile
    const updatedUserDetails = await User.findById(userId).populate("additionalDetails");

    // Return the updated user details with populated user details
    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (err) {
    console.log("error in update profile", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

   


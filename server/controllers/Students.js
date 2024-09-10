const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const UserDetails = require("../models/UserDetails"); 
const Company=require("../models/Company");
const Position=require("../models/Position")

const Application = require("../models/Application");

exports.getAllStudents = async (req, res) => {
  try {
    // Fetch all users and populate their associated details
    const students = await User.find({}).populate("additionalDetails").exec();

    if (!students) {
      return res
        .status(404)
        .json({ success: false, message: "No students found" });
    }

    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      students,
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.studentdetail = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid student ID format" });
    }
    const student = await User.findById(studentId)
      .populate("additionalDetails")
      .exec();
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Student data fetched successfully",
      data: student,
    });
  } catch (err) {
    console.error("Error fetching student details:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.editStudentDetail = async (req, res) => {
  try {
    const { studentId } = req.params;
    const {
      name,
      Enrollment,
      email,
      branch,
      section,
      placed,
      tenth,
      twelth,
      eligible,
      backlog,
    } = req.body;

    // Find the user by ID and update their details
    const student = await User.findByIdAndUpdate(
      studentId,
      { name, Enrollment, email },
      { new: true }
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Find and update the user's additional details
    let additionalDetails = await UserDetails.findById(
      student.additionalDetails
    );

    if (!additionalDetails) {
      additionalDetails = new UserDetails(); // Create new UserDetails if not found
      additionalDetails._id = student.additionalDetails; // Assign the ID from user document
    }

    additionalDetails.branch = branch;
    additionalDetails.section = section;
    additionalDetails.placed = placed;
    additionalDetails.tenth = tenth;
    additionalDetails.twelth = twelth;
    additionalDetails.eligible = eligible;
    additionalDetails.backlog = backlog;

    // Save the updated user and additional details
    await student.save();
    await additionalDetails.save();

    return res.status(200).json({
      success: true,
      message: "Student details updated successfully",
      student: {
        _id: student._id,
        name: student.name,
        Enrollment: student.Enrollment,
        email: student.email,
        additionalDetails: {
          branch: additionalDetails.branch,
          section: additionalDetails.section,
          placed: additionalDetails.placed,
          tenth: additionalDetails.tenth,
          twelth: additionalDetails.twelth,
          eligible: additionalDetails.eligible,
          backlog: additionalDetails.backlog,
        },
      },
    });
  } catch (err) {
    console.error("Error in editing student:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
exports.addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      Enrollment,
      branch,
      section,
      eligible,
      placed,
      CGPA,
      backlog,
      tenth,
      twelth,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !Enrollment ||
      !branch ||
      !section ||
      eligible === undefined ||
      placed === undefined ||
      CGPA === undefined ||
      backlog === undefined ||
      tenth === undefined ||
      twelth === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate numeric fields
    if (
      isNaN(CGPA) ||
      isNaN(backlog) ||
      isNaN(tenth) ||
      isNaN(twelth)
    ){
      return res.status(400).json({
        success: false,
        message: "Year, CGPA, Backlog, Tenth, Twelth should be numeric"
      });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password@123', saltRounds);

    // Create user
    const user = new User({
      name,
      email,
      Enrollment,
      password: hashedPassword, // Use the hashed password
      role: "User", // Default role
    });

    // Save user to get the _id for reference
    await user.save();

    // Create user details
    const userDetails = new UserDetails({
      name,
      branch,
      section,
      eligible: Boolean(eligible),
      placed: Boolean(placed),
      CGPA: parseFloat(CGPA),
      backlog: parseInt(backlog, 10),
      tenth: parseFloat(tenth),
      twelth: parseFloat(twelth),
    });

    // Save the user details and associate with the user
    const savedDetails = await userDetails.save();

    // Link userDetails to the user
    user.additionalDetails = savedDetails._id;
    await user.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      user,
      userDetails: savedDetails,
    });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};  

exports.getUserAppliedCompanies = async (req, res) => {
  try {
      // Get the user ID from the request parameters or body
      const userId = req.params.userId || req.body.userId;

      // Find the user and populate the appliedCompanies field
      const user = await User.findById(userId).populate({
        path: 'appliedCompanies',
        populate: {
          path: 'positions', // Adjust this to match the actual field name in your schema
        },
      });

      // If user not found, return a 404 response
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Extract the appliedCompanies details
      const appliedCompanies = user.appliedCompanies;

      // Return the details of applied companies
      res.status(200).json({
          message: 'Fetched applied companies successfully',
          appliedCompanies,
      });
  } catch (error) {
      // Handle errors and return a 500 response
      console.error('Error fetching applied companies:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}; 

exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ success: false, message: "Invalid student ID format" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the student by ID
    const student = await User.findById(studentId).populate("additionalDetails");

    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Delete the student's details
    if (student.additionalDetails) {
      await UserDetails.findByIdAndDelete(student.additionalDetails._id, { session });
    }

    // Delete the student
    await User.findByIdAndDelete(studentId, { session });

    // Remove student references from applications
    await Application.deleteMany({ user: studentId }, { session });

    // Remove student references from company appliedStudents arrays
    await Company.updateMany(
      { appliedStudents: studentId },
      { $pull: { appliedStudents: studentId } },
      { session }
    );

    // Remove student references from positions applicants arrays
    await Position.updateMany(
      { applicants: studentId },
      { $pull: { applicants: studentId } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
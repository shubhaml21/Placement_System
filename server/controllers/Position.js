const mongoose=require("mongoose");
const User = require("../models/User");
const Position = require("../models/Position");
const Application = require("../models/Application");
const Company=require("../models/Company")

// Apply for a position

exports.applyToPosition = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { companyId, positionId, userId } = req.body;

    // Find the company, position, and user
    const company = await Company.findById(companyId).session(session);
    const position = await Position.findById(positionId).session(session);
    const user = await User.findById(userId).session(session);

    if (!company) {
      await session.abortTransaction();
      session.endSession();
      return res.sendStatus(404); // Company not found
    }
    if (!position) {
      await session.abortTransaction();
      session.endSession();
      return res.sendStatus(404); // Position not found
    }
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.sendStatus(404); // User not found
    }

    // Check if the user has already applied for this position in this company
    const existingApplication = await Application.findOne({
      user: userId,
      position: positionId,
      company: companyId,
    }).session(session);

    if (existingApplication) {
      await session.abortTransaction();
      session.endSession();
      return res.sendStatus(400); // User has already applied for this position in this company
    }

    // Create a new application record
    const application = new Application({
      user: user._id,
      position: position._id,
      company: company._id,
    });
    await application.save({ session });

    // Add position to user's applied positions and company to user's applied companies
    user.appliedPositions.push(position._id);
    user.appliedCompanies.push(company._id);
    await user.save({ session });

    // Add user to the list of applicants for the position
    position.applicants.push(application._id);
    await position.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.sendStatus(200); // Successfully applied for the position in the company
  } catch (err) {
    console.error("Error applying to position:", err);
    await session.abortTransaction();
    session.endSession();
    res.sendStatus(500); // Internal server error
  }
};
  exports.getApplicationDetails = async (req, res) => {
    try {
      const { applicationId } = req.params;
  
      // Find the application by ID and populate related fields
      const application = await Application.findById(applicationId)
        .populate("user")
        .populate("company")
        .populate("position");
  
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Application details retrieved successfully",
        application,
      });
    } catch (err) {
      console.error("Error retrieving application details:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
    
  exports.getAllApplications = async (req, res) => {
    try {
      // Fetch all applications and populate related fields
      const applications = await Application.find()
        .populate("user", "") // Select only required fields from user
        .populate("company", "") // Select only required fields from company
        .populate("position", ""); // Select only required fields from position
  
      if (applications.length === 0) {
        return res.status(404).json({ success: false, message: "No applications found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Applications retrieved successfully",
        applications,
      });
    } catch (err) {
      console.error("Error retrieving applications:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
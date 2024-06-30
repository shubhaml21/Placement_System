const Company = require("../models/Company");
const Position = require("../models/Position");
const CompanyEligibility = require("../models/CompanyEligibility");
const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const emailTemplate = require("../mail template/companyvisitedTemplate");
 exports.addCompany = async (req, res) => {
  try {
    // Extract company details from request body
    const {
      companyName,
      companyDescription,
      companyLogo,
      companyType,
      companyWebsite,
      arrival_date,
      packageAmount,
      year,
    } = req.body;

    const eligibility = await CompanyEligibility.create({
      CGPA: null,
      backlogs: null,
      tenth: null,
      twelth: null,
    });

    // Create a new company document
    const newCompany = new Company({
      companyName,
      companyDescription,
      companyLogo,
      companyType,
      companyWebsite,
      arrival_date,
      packageAmount,
      eligibility: eligibility._id,
      year,
    });

    // Save the company document
    const savedCompany = await newCompany.save();

    // Populate the eligibility field
    await savedCompany.populate("eligibility");

    // Send success response
    // console.log("saved company",savedCompany);
    return res.status(201).json({
      success: true,
      message: "Company added successfully",
      company: savedCompany,
    });
  } catch (err) {
    console.log("Error in adding company:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to add company",
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    // Retrieve all companies and populate the eligibility details
    const companies = await Company.find().populate("eligibility");

    // Send success response with the list of companies
    return res.status(200).json({
      success: true,
      message: "Companies retrieved successfully",
      companies: companies,
    });
  } catch (err) {
    console.log("Error in retrieving companies:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve companies",
    });
  }
};

// edit company
exports.editCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const {
      companyName,
      companyDescription,
      companyLogo,
      companyType,
      companyWebsite,
      arrival_date,
      packageAmount,
      eligibility,
      year,
    } = req.body;

    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Update company details
    company.companyName = companyName || company.companyName;
    company.companyDescription =
      companyDescription || company.companyDescription;
    company.companyLogo = companyLogo || company.companyLogo;
    company.companyType = companyType || company.companyType;
    company.companyWebsite = companyWebsite || company.companyWebsite;
    company.arrival_date = arrival_date || company.arrival_date;
    company.packageAmount = packageAmount || company.packageAmount;
    company.year = year || company.year;

    // If eligibility details are provided, update the eligibility document
    if (eligibility) {
      const { CGPA, backlogs, tenth, twelfth } = eligibility;

      // Validate eligibility details
      if (
        typeof CGPA !== "number" ||
        typeof backlogs !== "number" ||
        typeof tenth !== "number" ||
        typeof twelfth !== "number"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid eligibility details",
        });
      }

      // Find and update the eligibility document
      const eligibilityDoc = await CompanyEligibility.findById(
        company.eligibility
      );

      if (eligibilityDoc) {
        eligibilityDoc.CGPA = CGPA;
        eligibilityDoc.backlogs = backlogs;
        eligibilityDoc.tenth = tenth;
        eligibilityDoc.twelfth = twelfth;

        await eligibilityDoc.save();
      }
    }

    // Save the updated company document
    const updatedCompany = await company.save();

    // Populate the eligibility field
    await updatedCompany.populate("eligibility");

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (err) {
    console.log("Error in editing company:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to edit company",
    });
  }
};
// company deletion
exports.deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Delete the company
    await Company.findByIdAndDelete(companyId);

    // If company has an eligibility document, delete it as well
    if (company.eligibility) {
      await CompanyEligibility.findByIdAndDelete(company.eligibility);
    }

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleting company:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete company",
    });
  }
};

// elegibility update
exports.editEligibility = async (req, res) => {
  try {
    // Extract eligibility details and company ID from request body
    const { companyId } = req.params;
    const {
      // companyId,
      CGPA,
      backlogs,
      tenth,
      twelth,
    } = req.body;

    // Find the company by ID
    // console.log("company id",companyId)
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Find the eligibility document by ID
    const eligibility = await CompanyEligibility.findById(company.eligibility);

    if (!eligibility) {
      return res.status(404).json({
        success: false,
        message: "Eligibility not found",
      });
    }

    // Update eligibility details
    eligibility.CGPA = CGPA;
    eligibility.backlogs = backlogs;
    eligibility.tenth = tenth;
    eligibility.twelth = twelth;

    // Save the updated eligibility document
    await eligibility.save();

    // Populate the eligibility field and send the updated company document
    const updatedCompany = await Company.findById(companyId).populate(
      "eligibility"
    );
    const users = await User.find({});

    // console.log("users", users);

    const emailBody = emailTemplate( 
      
      updatedCompany.companyName,
      updatedCompany.eligibility,
      updatedCompany.arrival_date
    );

    const emailPromises = users.map(async (user) => {
      try {
        await mailSender(user.email, " New Company Visit", emailBody);
      } catch (err) {
        console.error(`Error sending email to ${user.email}:`, err);
      }
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    // Send success response
    // console.log("updated company",updatedCompany);
    return res.status(200).json({
      success: true,
      message: "Eligibility updated successfully",
      company: updatedCompany,
    });
  } catch (err) {
    console.log("Error in editing eligibility:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to edit eligibility",
    });
  }
};
 
exports.addPositionToCompany = async (req, res) => { 
  const{companyId}=req.params;
  const {  title, description, requiredSkills, location, salary, isRemote, applicationDeadline } = req.body;

 
  try {
    // Create a new position
    const newPosition = new Position({
      title,
      description,
      requiredSkills,
      location,
      salary,
      isRemote,
      applicationDeadline: new Date(applicationDeadline),
    });

    // Save the new position to the database
    const savedPosition = await newPosition.save();

    // Find the company by ID and update the positions array
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { $push: { positions: savedPosition._id } }, // Push the new position's ObjectId to the company's positions array
      { new: true, useFindAndModify: false } // Return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).send("Company not found.");
    }

    res.status(201).json({
      message: "Position added successfully and company updated.",
      position: savedPosition,
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error adding position:", error);
    res.status(500).send("Internal server error.");
  }
}; 

exports.getAllPositionsOfCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    // Find the company by ID
    const company = await Company.findById(companyId).populate('positions');

    if (!company) {
      return res.status(404).send("Company not found.");
    }

    // Get all positions associated with the company
    const positions = company.positions;

    res.status(200).json({
      message: "Positions retrieved successfully.",
      company: {
        _id: company._id,
        companyName: company.companyName,
        positions: positions,
      },
    });
  } catch (error) {
    console.error("Error retrieving positions:", error);
    res.status(500).send("Internal server error.");
  }
};  
  
exports.getStudentCountForCompany = async (req, res) => {
  try {
    const { companyId } = req.params||req.body;

    // Find the company by ID and populate appliedStudents field
    const company = await Company.findById(companyId).populate('appliedStudents');

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Get the count of applied students
    const studentCount = company.appliedStudents.length;

    // Send the response with the count
    return res.status(200).json({
      success: true,
      message: "Student count retrieved successfully",
      studentCount: studentCount,
    });
  } catch (err) {
    console.log("Error in retrieving student count:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve student count",
    });
  }
};
 
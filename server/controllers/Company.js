const Company = require("../models/Company");
const CompanyEligibility = require("../models/CompanyEligibility");

exports.addCompany = async (req, res) => {
  try {
    // Extract company details from request body
    const {
      companyName,
      companyDescription,
      companyLogo,
      companyWebsite,
      arrival_date,
      package,
      eligibility,
      year
    } = req.body;

    // Check if eligibility details are provided
    if (!eligibility) {
      return res.status(400).json({
        success: false,
        message: "Eligibility details are required"
      });
    }

    // Validate eligibility details
    const {
      CGPA,
      backlogs,
      tenth,
      twelth
    } = eligibility;

    if (typeof CGPA !== 'number' || typeof backlogs !== 'number' || typeof tenth !== 'number' || typeof twelth !== 'number') {
      return res.status(400).json({
        success: false,
        message: "Invalid eligibility details"
      });
    }

    // Create a new company eligibility document
    const newEligibility = new CompanyEligibility({
      CGPA,
      backlogs,
      tenth,
      twelth
    });

    // Save the eligibility document
    const savedEligibility = await newEligibility.save();

    // Create a new company document
    const newCompany = new Company({
      companyName,
      companyDescription,
      companyLogo,
      companyWebsite,
      arrival_date,
      package,
      eligibility: savedEligibility._id, // Assign the eligibility document's ID
      year
    });

    // Save the company document
    const savedCompany = await newCompany.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Company added successfully",
      company: savedCompany
    });
  } catch (err) {
    console.log("error in adding company", err);
    return res.status(500).json({
      success: false,
      message: "Unable to add company"
    });
  }
};

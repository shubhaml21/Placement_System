// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  companyType:{
    type:String,
    required:true,
  },
  companyLogo: {
    type: String,
    // required: true
  },
  companyWebsite: {
    type: String,
    // required: true
  },
  arrival_date: {
    type: String,
    required: true,
  },
  packageAmount: {
    type: Number,
    required: true,
  },
  eligibility: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Companyeligibilty",
  },
  year: {
    type: Number,
    required: true,
  }, 
  positions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Position",
  }],
  appliedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Company", companySchema);

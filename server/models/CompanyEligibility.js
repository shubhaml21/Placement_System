// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const companyEligiblitySchema = new mongoose.Schema({
  CGPA: {
    type: Number,
    // required: true,
  },
  backlogs: {
    type: Number,
    // required: true,
  },
  tenth: {
    type: Number,
    // required: true,
  }, 
  
  twelth: {
    type: Number,
    // required: true,
  },
});

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Companyeligibilty", companyEligiblitySchema);

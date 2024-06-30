const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  branch: {
    type: String,
  },
  section: {
    type: String,
  },
  year: {
    type: Number,
  },
  eligible: {
    type: Boolean,
    
  },
  placed: {
    type: Boolean,
 
  },
  CGPA: {
    type: Number,
  },
  backlog: {
    type: Number,
  },
  tenth: {
    type: Number,
  },
  twelth: {
    type: Number,
  },
  package: {
    type: Number,
  },
});

module.exports = mongoose.model("userDetails", profileSchema);

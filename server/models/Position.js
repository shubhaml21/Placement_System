const mongoose=require("mongoose"); 

const positionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    requiredSkills: {
      type: [String], 
    },
    location: {
      type: String,
    },
    salary: {
      type: Number,
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    applicationDeadline: {
      type: Date,
    },
    applicants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Application",
        },
      ],
  }); 

  module.exports = mongoose.model("Position", positionSchema);
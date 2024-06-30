const User = require("../models/User");
const UserDetails = require("../models/UserDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, Enrollment, email, password, confirmpassword } =
      req.body;

    if (
      !name ||
      !Enrollment||
      !email ||
      !password ||
      !confirmpassword
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = await UserDetails.create({
      branch: null,
      section: null,
      year: null,
      CGPA:null,
      backlogs:null,
      tenth:null,
      twelth:null
    });

    const user = await User.create({
      name,
      Enrollment,
      additionalDetails: userDetails._id,
      email,
      password: hashedPassword,
      image: "",
    });
      // console.log("user created",user);
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "all fields are required",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails").exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered please sign up",
      });
    }   
    // console.log("user Data with additional detail",user )

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      // console.log("Token", token)
      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged in successfully",
      }); 

    
    } else {
      return res.status(401).json({
        success: false,
        message: "password is incorect",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

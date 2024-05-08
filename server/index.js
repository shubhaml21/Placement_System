
const express = require("express");
const app = express();  

const cookie_parser = require("cookie-parser");  
const userRoute=require("./routes/User") 
const profileRoute=require("./routes/Profile")
const database = require("./config/database"); 
const cors = require("cors");
require("dotenv").config();
database.connect(); 
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cookie_parser());


app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  ); 
  
app.use("/api/v1/auth", userRoute); 
app.use("/api/v1/profile", profileRoute); 


  app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running.....",
    });
  });  

  app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
  });
  
  
  

const express = require("express");
const app = express();  

const cookie_parser = require("cookie-parser");  
const userRoute=require("./routes/User") 
const profileRoute=require("./routes/Profile")
const CompanyRoute=require("./routes/Companyroute")
const studentRoute=require("./routes/Students")
const database = require("./config/database"); 
const cors = require("cors");
// const { createAdmin } = require("./admin/admin");



require("dotenv").config();
database.connect(); 
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(cookie_parser());



app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );  
  
// app.post("/api/v1/admin/create", createAdmin);
app.use("/api/v1/auth", userRoute); 
app.use("/api/v1/profile", profileRoute); 
app.use("/api/v1/admin",CompanyRoute,studentRoute);
app.use("/api/v1/student",studentRoute)

  app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running.....",
    });
  });  

  app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
  });
  
  // createAdmin();
  
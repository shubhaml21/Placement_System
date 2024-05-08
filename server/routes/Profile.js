const express = require("express")
const router = express.Router()  
const {auth}=require("../middleware/auth")
 

const {updateProfile}=require("../controllers/Profile")

router.put("/updateprofile",auth,updateProfile)



module.exports = router
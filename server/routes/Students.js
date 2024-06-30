const express = require("express")
const router = express.Router()  
const {auth}=require("../middleware/auth") 


const {getAllStudents,editStudentDetail, addStudent,getUserAppliedCompanies,deleteStudent}=require("../controllers/Students");
const {applyToPosition} =require("../controllers/Position");

router.get("/getAllStudents/",getAllStudents)
// router.get("student/:studentId",studentdetail);
router.put("/editstudent/:studentId",auth,editStudentDetail)
router.post("/addstudent",auth,addStudent)
router.post("/apply",auth,applyToPosition) ;
router.get("/getappliedcompanies/:userId",auth,getUserAppliedCompanies)
router.delete("/deletestudent/:studentId",  deleteStudent)

module.exports = router
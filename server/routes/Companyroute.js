const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");

const {
 
  addCompany,
  getAllCompanies,
  editCompany,
  deleteCompany,
  editEligibility,
  addPositionToCompany,
  getAllPositionsOfCompany,
  getStudentCountForCompany
} = require("../controllers/Company");
 const {getApplicationDetails,getAllApplications,}=require("../controllers/Position") 

router.post("/addCompany/", auth, addCompany);
router.get("/getAllCompanies/", auth, getAllCompanies);
router.put("/editCompany/:companyId", auth, editCompany);
router.delete("/deleteCompany/:companyId", auth, deleteCompany);
router.put("/company/:companyId/eligibility", editEligibility);
router.post("/addposition/:companyId", auth, addPositionToCompany);
router.get("/getcompanyposition/:companyId", auth, getAllPositionsOfCompany);
router.get("/application/:applicationId",auth, getApplicationDetails); 
router.get("/getallapplication",getAllApplications);
router.get("/getstudentcount/:companyId",auth,getStudentCountForCompany)

module.exports = router;

const BASE_URL="http://localhost:4000/api/v1";

export const settingEndpoints={
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateprofile",
}
export const companyApiEndpoints={
    POST_COMPANY_API:BASE_URL+"/admin/addCompany",
    GET_COMPANY_API:BASE_URL+"/admin/getAllCompanies",
    DELETE_COMPANY_API:BASE_URL+"/admin/deleteCompany/:companyId",
    EDIT_COMPANY_API:BASE_URL+"/admin/editCompany/:companyId",
    EDIT_ELIGIBILITY_API:BASE_URL+"/admin/company/:companyId/eligibility",
    GET_POSITION_OF_COMPANY:BASE_URL+"/admin/getcompanyposition/:companyId",
    ADD_POSITION_TO_COMPANY:BASE_URL+"/Admin/addposition/:companyId",   
    GET_STUDENT_COUNT:BASE_URL+"/Admin/getstudentcount/:companyId",  
}

export const studentsApiEndpoints={
    GET_AllSTUDENTS_API:BASE_URL+"/admin/getAllstudents",
   ADD_STUDENT_API:BASE_URL+"/admin/addstudent",
    EDIT_STUDENT_DETAIL_API:BASE_URL+"/admin/editstudent/:studentId",
     APPLY_TO_COMPANY_API:BASE_URL+"/student/apply", 
     GET_STUDENT_APPLIED_COMPANY:BASE_URL+"/student/getappliedcompanies/:userId", 
      DELETE_STUDENT_API:BASE_URL+"/student/deletestudent/:studentId"

}
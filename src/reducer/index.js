import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import companyReducer from "../slices/companySlice"
import studentReducer from "../slices/studentSlice"
import applicationReducer from "../slices/applicationSlice";

const rootReducer=combineReducers({
    auth:authReducer,
    company:companyReducer,
    students:studentReducer,
    applications:applicationReducer
})

export default rootReducer
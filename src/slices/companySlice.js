import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
    isLoading: false,
    companies: localStorage.getItem("companies") ? JSON.parse(localStorage.getItem("companies")) : [],
    error: '',
    position: [],
    studentcount: [],
};

const companySlice = createSlice({
    name: "Company",
    initialState: initialState,
    reducers: {
        addCompanies: (state, action) => {
            state.companies.push(action.payload);
            localStorage.setItem("companies", JSON.stringify(state.companies));
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
            localStorage.setItem("companies", JSON.stringify(state.companies));
        },
        updateCompany: (state, action) => {
            // Update a specific company in the state
            const updatedCompany = action.payload;
            state.companies = state.companies.map(company =>
                company._id === updatedCompany._id ? updatedCompany : company
            );
            // Update local storage with the updated companies
            localStorage.setItem("companies", JSON.stringify(state.companies));
        },
        removeCompany: (state, action) => {
            // Remove a specific company from the state
            const companyId = action.payload;
            state.companies = state.companies.filter(company => company._id !== companyId);
            // Update local storage with the updated companies
            localStorage.setItem("companies", JSON.stringify(state.companies));
        },
        setPosition:(state,action)=>{
            state.position=action.payload;
        },
        setStudentCount: (state, action) => {
            state.studentcount = action.payload;
        },
       
    },
});

export const { addCompanies, setIsLoading, setError, setCompanies ,updateCompany, removeCompany,setPosition,setStudentCount} = companySlice.actions;
export default companySlice.reducer;

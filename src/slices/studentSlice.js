import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: '',
    students: JSON.parse(localStorage.getItem("students")) || [],
    appliedcompany:[],
}

const authSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: { 
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setStudents: (state, action) => {
            state.students = action.payload // Add setStudents action to update students state
        },
        editStudentDetail: (state, action) => {
            // Update a specific student in the state
            const updatedStudent = action.payload;
            state.students = state.students.map(student =>
                student._id === updatedStudent._id ? updatedStudent : student
            );
            // Update local storage with the updated students array
            localStorage.setItem("students", JSON.stringify(state.students));
        },
        addStudentDetail: (state, action) => {
            state.students.push(action.payload); 
          },
          setAppliedCompany: (state,action)=>{
            state.appliedcompany=action.payload
          }        
    },
})

export const { setToken, setLoading, setError, setStudents ,setUser,editStudentDetail,addStudentDetail,setAppliedCompany} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


// Define parsing functions to handle potential errors
const initialState = {
    isLoading: false,
    isAuth: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    error: ''
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setIsAuth:(state,action)=>{
            state.isAuth=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    },
})

export const {setToken,setUser,setLoading,setIsAuth,setError}=authSlice.actions;
export default authSlice.reducer;

import {setToken,setUser,} from "../../slices/authSlice"
import {toast} from "react-hot-toast"



export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      localStorage.removeItem("isAdmin")
    
      // localStorage.removeItem("companies")
     
      toast.success("Logged Out")
      navigate("/")
    }
  }
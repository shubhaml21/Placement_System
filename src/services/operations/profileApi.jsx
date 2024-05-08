import {apiConnector} from "../apiConnector"
import { settingEndpoints } from "../apis"
import { toast } from "react-hot-toast";
import {setUser} from "../../slices/authSlice";
const {UPDATE_PROFILE_API}=settingEndpoints;


export function updateProfile(token,formdata){
    return async (dispatch)=>{
        const toastId=toast.loading("loading...");
        console.log("function token",token,formdata); 
       
        try{
            const response=await apiConnector("PUT",UPDATE_PROFILE_API,formdata,{
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_PROFILE_API API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
              }
       
              const userImage = (await response.data.updatedUserDetails.image)
              ? response.data.updatedUserDetails.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.fullname} ${response.data.updatedUserDetails.fullname}`;
            
         
            dispatch(
                setUser({ ...response.data.updatedUserDetails, image: userImage })
              );
         
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.updatedUserDetails)
              );
 
              toast.success("Profile Updated Successfully");
        }catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error);
            toast.error("Could Not Update Profile");
          }
          toast.dismiss(toastId);
    };
}
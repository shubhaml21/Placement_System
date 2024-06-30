import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { companyApiEndpoints } from "../apis";
import {
  addCompanies,
  removeCompany,
  setCompanies,
  setPosition,
  updateCompany,
  setIsLoading,
  setError,
  setStudentCount,
} from "../../slices/companySlice";
import { useSelector } from "react-redux";
const {
  POST_COMPANY_API,
  GET_COMPANY_API,
  DELETE_COMPANY_API,
  EDIT_COMPANY_API,
  EDIT_ELIGIBILITY_API,
  GET_POSITION_OF_COMPANY,
  ADD_POSITION_TO_COMPANY,
  GET_STUDENT_COUNT,
} = companyApiEndpoints;

export function addCompany(token, formdata) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    console.log("function token", token, formdata);

    try {
      const response = await apiConnector("POST", POST_COMPANY_API, formdata, {
        Authorization: `Bearer ${token}`,
      });
      console.log("ADD COMPANY API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(addCompanies({ ...response.data.company }));

      localStorage.setItem("companies", JSON.stringify(response.data.company));

      toast.success("Company Added Successfully");
    } catch (error) {
      console.log("adding company ERROR............", error);
      toast.error("Could Not Add Company");
    }
    toast.dismiss(toastId);
  };
}

// get all companies
export function getAllCompanies(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    console.log("Function token", token);

    try {
      const response = await apiConnector("GET", GET_COMPANY_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET COMPANY API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the retrieved companies to the store
      dispatch(setCompanies(response.data.companies));

      // Update local storage with the retrieved companies
      // localStorage.setItem("companies", JSON.stringify(response.data.company));

      // toast.success("Companies Retrieved Successfully");
    } catch (error) {
      console.log("Getting companies ERROR............", error);
      toast.error("Could Not Retrieve Companies");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function getPositionDetail(token, companyId) {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        GET_POSITION_OF_COMPANY.replace(":companyId", companyId),
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("GET POSITION DETAIL API RESPONSE:", response); 
     

      if (
        !response.data.company ||
        !Array.isArray(response.data.company.positions)
      ) {
        throw new Error("Invalid positions data");
      }

      dispatch(setPosition(response.data.company.positions)); 
        

     
    } catch (err) {
      console.log("Error fetching position details:", err);
      dispatch(setError("Failed to fetch positions"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function addPositionToCompany(token, companyId, formData) {
  console.log("function token ", token, companyId, formData);
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        ADD_POSITION_TO_COMPANY.replace(":companyId", companyId),
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("ADD POSITION TO COMPANY API RESPONSE:", response);
      dispatch(setIsLoading(false));
      dispatch(setPosition(response.data.company.positions));
    
      toast.success("Position Added to Company Successfully");
    } catch (err) {
      console.log("Error fetching position details:", err);
      dispatch(setError("Failed to fetch positions"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function editCompany(token, companyId, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating company...");
    // console.log("Edit Company Function token", token, companyId, formData);

    try {
      const response = await apiConnector(
        "PUT",
        EDIT_COMPANY_API.replace(":companyId", companyId),
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("EDIT COMPANY API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the updated company to the store
      dispatch(updateCompany({ ...response.data.company }));

      // Update local storage with the updated company
      const companies = JSON.parse(localStorage.getItem("companies"));
      const updatedCompanies = companies.map((company) =>
        company._id === companyId ? response.data.company : company
      );
      // localStorage.setItem("companies", JSON.stringify(updatedCompanies));

      toast.success("Company Updated Successfully");
    } catch (error) {
      console.log("Editing company ERROR............", error);
      toast.error("Could Not Update Company");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function deleteCompany(token, companyId) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting company...");
    console.log("Function....of deleting", token, companyId);

    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_COMPANY_API.replace(":companyId", companyId),
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("DELETE COMPANY API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the delete action to the store
      dispatch(removeCompany(companyId));

      // Update local storage by removing the deleted company
      const storedCompanies =
        JSON.parse(localStorage.getItem("companies")) || [];
      const updatedCompanies = storedCompanies.filter(
        (company) => company._id !== companyId
      );
      // localStorage.setItem("companies", JSON.stringify(updatedCompanies));

      toast.success("Company Deleted Successfully");
    } catch (error) {
      console.log("Deleting company ERROR............", error);
      toast.error("Could Not Delete Company");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
export function editEligibility(token, companyId, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating eligibility...");
    console.log("Edit Eligibility Function token", token, companyId, formData);

    try {
      const response = await apiConnector(
        "PUT",
        EDIT_ELIGIBILITY_API.replace(":companyId", companyId),
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("EDIT ELIGIBILITY API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the updated company to the store
      dispatch(updateCompany({ ...response.data.company }));

      // Update local storage with the updated company
      const companies = JSON.parse(localStorage.getItem("companies"));
      const updatedCompanies = companies.map((company) =>
        company._id === companyId ? response.data.company : company
      );
      // localStorage.setItem("companies", JSON.stringify(updatedCompanies));

      toast.success("Eligibility Updated Successfully");
      toast.success("Email Send to all the Registered User");
    } catch (error) {
      console.log("Editing eligibility ERROR............", error);
      toast.error("Could Not Update Eligibility");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// export function getStudentCount(token, companyId, formData) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Getting Student Count...");
//     console.log("GET STUDENT COUNT API............", companyId, formData);
//     try {
//       const response = await apiConnector(
//         "GET",
//         GET_STUDENT_COUNT.replace(":companyId", companyId),
//         formData,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       console.log("GET STUDENT COUNT API RESPONSE............", response);

//       dispatch(setStudentCount(response.students));
//     } catch (err) {
//       console.log("GET STUDENT COUNT API ERROR............", err);
//     } finally {
//       toast.dismiss(toastId);
//     }
//   };
// }

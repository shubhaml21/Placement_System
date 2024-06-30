import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify";
import { studentsApiEndpoints } from "../apis";
import {
  setStudents,
  editStudentDetail,
  addStudentDetail,
  setAppliedCompany,
} from "../../slices/studentSlice"; // Adjust the import path as needed
import { setUser } from "../../slices/authSlice";

const {
  GET_AllSTUDENTS_API,
  GET_STUDENT_DETAIL_API,
  GET_STUDENT_APPLIED_COMPANY,
  EDIT_STUDENT_DETAIL_API,
  ADD_STUDENT_API,
  APPLY_TO_COMPANY_API,
  DELETE_STUDENT_API,
} = studentsApiEndpoints;

export function getAllStudents() {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...");

    try {
      const token = localStorage.getItem("token");
      // console.log("Function token", token);

      const response = await apiConnector("GET", GET_AllSTUDENTS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      // console.log("GET ALL STUDENTS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the retrieved students to the store
      dispatch(setStudents(response.data.students));

      // Update local storage with the retrieved students
      // localStorage.setItem("students", JSON.stringify(response.data.students));

      // toast.success("Students Retrieved Successfully");
    } catch (error) {
      console.log("Getting students ERROR............", error);
      toast.error("Could Not Retrieve Students");
    } finally {
      // toast.dismiss(toastId);
    }
  };
}

export function editStudent(token, studentId, formData) {
  return async (dispatch) => {
    console.log("edit student", token, studentId, formData);
    const toastId = toast.loading("Loading...");
    try {
      // Make API call to update student details
      const response = await apiConnector(
        "PUT",
        EDIT_STUDENT_DETAIL_API.replace(":studentId", studentId),
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("GET student API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch action to update Redux store
      dispatch(editStudentDetail(response.data.student)); // Use correct action

      toast.success("Student details updated successfully");
    } catch (err) {
      console.error("Error in edit student", err);
      toast.error("Error in updating student details");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function addstudent(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    console.log("Add student:", token, formData);
    try {
      const response = await apiConnector("POST", ADD_STUDENT_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Add Student API response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch the action with the new student data
      dispatch(addStudentDetail(response.data.user));

      // Update local storage with the new student
      // const existingStudents =
      //   JSON.parse(localStorage.getItem("students")) || [];
      // existingStudents.push(response.data.user);
      // localStorage.setItem("students", JSON.stringify(existingStudents));

      toast.success("Student added successfully");
    } catch (err) {
      console.error("Error in adding student:", err);
      toast.error("Error in adding student details");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function applyToCompany(token, formData) {
  const toastId = toast.loading("Loading...");
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        APPLY_TO_COMPANY_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Apply to company API response:", response);

     

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

  
    } catch (err) {
      console.error("Error in applying:", err);
      toast.error("Error in applying");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function getappliedcompanies(token, userId) {
  console.log("studentId and token", token, userId); // Debug line

  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_STUDENT_APPLIED_COMPANY.replace(":userId", userId),
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("Get applied companies API response:", response); // Debug line

      if (response.status === 500) {
        toast.error("Internal Server error");
      }

      dispatch(setAppliedCompany(response.data.appliedCompanies));
    } catch (error) {
      console.log("Error in getting applied companies:", error); // Debug line
      toast.error("Error in getting applied companies");
    }
  };
}

export function deleteStudent(token, studentId, callback) { 

  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_STUDENT_API.replace(":studentId", studentId),
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.status === 200) {
        toast.success("Student deleted successfully");
        if (callback) callback();
      }
    } catch (error) {
      console.log("Error in deleting student:", error);
      toast.error("Error in deleting student");
    }
  };
}

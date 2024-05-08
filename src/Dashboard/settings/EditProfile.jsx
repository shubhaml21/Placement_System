import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../components/modal/IconBtn";
import { updateProfile } from "../../services/operations/profileApi";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user?.name || "",
      email: user?.email || "",
      branch: user?.additionalDetails?.branch || "",
      section: user?.additionalDetails?.section || "",
      Enrollment: user?.Enrollment || "",
      year: user?.additionalDetails?.year || "",
      CGPA: user?.additionalDetails?.CGPA || "",
      tenth: user?.additionalDetails?.tenth || "",
      twelth: user?.additionalDetails?.twelth || "",
      backlog: user?.additionalDetails?.backlog || "",
    },
  });

  const submitProfileForm = async (data) => {
       
      console.log("Form Data-",data)
      try{  
        dispatch(updateProfile(token,data))

      }catch(err){
        console.log("ERROR MESSAGE - ", err.message)
      }
    
      navigate("/dashboard/myprofile");
    
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitProfileForm)}
        className="my-2 flex flex-col gap-y-6 rounded-md border-1 border-richblack-700 bg-richblack-800 p-2 px-12"
      >
        {/* Profile Information */}
        <h2 className="text-xl font-semibold text-richblack-5">
          Profile Information
        </h2> 
        
        <div className="rounded-lg border-spacing-1  bg-gray-50 p-2 gap-y-2"> 
        <h2 className="text-lg font-medium text-richblack-5 mb-3">General Details</h2> 
        <div className="flex flex-col gap-6  lg:flex-row">
          <div className="flex flex-col gap-1 lg:w-[438px]">
            <label htmlFor="fullname" className="label-style">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter fullname"
              className="form-style"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <span className="-mt-1 text-12 text-red-800">
                Please enter your fullname name.
              </span>
            )}
          </div>
          {/* Repeat similar structure for other fields */}

          <div className="flex flex-col gap-1 lg:w-[438px]">
            <label htmlFor="email" className="label-style">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              className="form-style"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-12 text-red-800">
                Please enter your Email
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5  justify-evenly lg:flex-row">
          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="branch" className="lable-style">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              id="branch"
              placeholder="Enter branch"
              className="form-style"
              {...register("branch", { required: true })}
            />
            {errors.branch && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your branch.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="section" className="lable-style">
              Section
            </label>
            <input
              type="text"
              name="section"
              id="section"
              placeholder="Enter section"
              className="form-style"
              {...register("section", { required: true })}
            />
            {errors.section && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your section.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5  justify-evenly lg:flex-row">
          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="Enrollment" className="lable-style">
              Enrollment Number
            </label>
            <input
              type="text"
              name="Enrollment"
              id="Enrollment"
              placeholder="Enter Enrollment Number"
              className="form-style"
              {...register("Enrollment", { required: true })}
            />
            {errors.Enrollment && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your section.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="year" className="lable-style">
              Year
            </label>
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Enter year"
              className="form-style"
              {...register("year", { required: true })}
            />
            {errors.year && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your year.
              </span>
            )}
          </div>
        </div>
        </div>


      <div className="rounded-lg border-spacing-1  bg-gray-50 p-2 gap-y-2">
     <h2 className="text-lg font-medium text-richblack-5 mb-3">Academic Details</h2> 
     

     
        <div className="flex flex-col gap-5  justify-evenly lg:flex-row">
          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="CGPA" className="lable-style">
              CGPA
            </label>
            <input
              type="text"
              name="CGPA"
              id="CGPA"
              placeholder="Enter CGPA"
              className="form-style"
              {...register("CGPA", { required: true })}
            />
            {errors.CGPA && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your CGPA.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="tenth" className="lable-style">
              10th Percentage
            </label>
            <input
              type="text"
              name="tenth"
              id="tenth"
              placeholder="Enter 10th Percentage"
              className="form-style"
              {...register("tenth", { required: true })}
            />
            {errors.tenth && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your 10th Percentage.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5  justify-evenly lg:flex-row">
          <div className="flex flex-col gap-1 lg:w-[48%]">
            <label htmlFor="twelth" className="lable-style">
              12th Percentage
            </label>
            <input
              type="text"
              name="twelth"
              id="twelth"
              placeholder="Enter 12th Percentage"
              className="form-style"
              {...register("twelth", { required: true })}
            />
            {errors.twelth && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your 12th Percentage.
              </span>
            )}
          </div>

          <div className="flex flex-col  ju gap-1 lg:w-[48%]">
            <label htmlFor="backlog" className="lable-style">
              Backlogs
            </label>
            <input
              type="text"
              name="backlog"
              id="backlog"
              placeholder="Enter Backlogs"
              className="form-style"
              {...register("backlog", { required: true })}
            />
            {errors.backlog && (
              <span className="-mt-1 text-[12px] text-red-800">
                Please enter your Backlogs.
              </span>
            )}
          </div>
        </div>
 
        </div>
        <div className="flex flex-col gap-5  justify-evenly lg:flex-row">
          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={() => navigate("/dashboard/myprofile")}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" />
          </div>
        </div>  
      </form>
    </>
  );
}

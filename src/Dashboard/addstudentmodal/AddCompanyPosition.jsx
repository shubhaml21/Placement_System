import { RxCross1 } from "react-icons/rx"; 
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPositionToCompany } from "../../services/operations/companyApi";
import { useParams } from "react-router-dom";

const AddCompanyPosition = ({ isOpen, onClose }) => {   
    const {companyId}=useParams(); 
    const dispatch=useDispatch();
    const {token}=useSelector(state=>state.auth);

  const [formData,setFormData]=useState({ 
   title: "",
    description: "",
    requiredSkills: "",
    location: "",
    salary: "",
    isRemote: false,
    applicationDeadline: "",
  });
   
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  if (!isOpen) {
    return null;
  }
   
   function handleSubmit(e){   
    console.log(formData); 
    dispatch(addPositionToCompany(token,companyId,formData))
    e.preventDefault();
    
   onClose()
   }



  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-40 ">
      <div className="bg-white w-full max-w-md p-5 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-3 text-card-foreground ">
          Add Company Position
        </h2> 
         <button className=" text-red-500 absolute right-2 top-4 rounded-full text-bold p-2" onClick={onClose}><RxCross1 fontSize={25}/></button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"  
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              placeholder="Enter title here"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-muted-foreground"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"  
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className=" block w-full px-2 py-1 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              placeholder="Enter Description here"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="requiredSkills"
              className="block text-sm font-medium text-muted-foreground"
            >
              Required Skills
            </label>
            <input
              type="text"
              id="requiredSkills" 
              value={formData.requiredSkills}
              onChange={handleChange}
              name="requiredSkills"
               placeholder="Enter required skills here"
              className="mt-1 block w-full px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-muted-foreground"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location" 
              value={formData.location}
              onChange={handleChange}
               placeholder="Enter location here"
              className="mt-1 block w-full px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-muted-foreground"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary" 
              value={formData.salary} 
              onChange={handleChange}
              name="salary"
               placeholder="Enter Salary here"
               className="mt-1 block w-full px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox" 
              value={formData.isRemote}
              id="isRemote"
              onChange={handleChange}
              name="isRemote"
               className="mt-1 mr-2 border-border rounded-md focus:ring-primary focus:border-primary bg-input text-foreground"
            />
            <label
              htmlFor="isRemote"
              className="block text-sm font-medium text-muted-foreground"
            >
              Is Remote?
            </label>
          </div>
          <div className="mb-4">
            <label
              for="applicationDeadline"
              className="block text-sm font-medium text-muted-foreground"
              
            >
              Application Deadline
            </label>
            <input
              type="date"  
              value={formData.applicationDeadline}
              onChange={handleChange}
              id="applicationDeadline"
              name="applicationDeadline"
               placeholder="Enter Application Date here"
              className="mt-1 block w-full px-3 py-2 border outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary  bg-purple-400 text-primary-foreground px-3 py-2 rounded-md hover:bg-primary/80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyPosition;

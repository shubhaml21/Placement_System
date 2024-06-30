import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addstudent } from '../../services/operations/studentsApi';


const EnrollmentModal = ({ isOpen, onClose }) => { 
  const dispatch=useDispatch(); 
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    section: '',
    tenth: '',
    twelth: '',
    backlog: '',
    eligible: false, // Default value
    placed: false ,
    Enrollment:"" ,
    CGPA:"",
     // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target; 
    const updatedValue = name === "placed" || name === "eligible" ? value === "YES" : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: updatedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  
    // dispatch(addStudent(token,formData));
    dispatch(addstudent(token,formData));
    // Example: Log form data or send to API
    onClose(); // Close modal after submission
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50  text-xs">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg  p-6 mx-4">
            <h2 className="text-center text-2xl font-bold mb-6">Add Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>
              <div className="flex space-x-4"> 
              <div className="flex-1 flex flex-col">
                <label htmlFor="email" className="text-gray-700">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                /> 
                 </div>
                 <div className="flex-1 flex flex-col">
                  <label htmlFor="Enrollment" className="text-gray-700">Enrollment:</label>
                  <input 
                    type="text" 
                    id="Enrollment" 
                    name="Enrollment" 
                    value={formData.Enrollment} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="branch" className="text-gray-700">Branch:</label>
                  <input 
                    type="text" 
                    id="branch" 
                    name="branch" 
                    value={formData.branch} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label htmlFor="section" className="text-gray-700">Section:</label>
                  <input 
                    type="text" 
                    id="section" 
                    name="section" 
                    value={formData.section} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="tenth" className="text-gray-700">10th Percentage:</label>
                  <input 
                    type="text" 
                    id="tenth" 
                    name="tenth" 
                    value={formData.tenth} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label htmlFor="twelth" className="text-gray-700">12th Percentage:</label>
                  <input 
                    type="text" 
                    id="twelth" 
                    name="twelth" 
                    value={formData.twelth} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="flex space-x-4"> 
              <div className="flex-1 flex flex-col">
                <label htmlFor="backlog" className="text-gray-700">Any Backlog:</label>
                <input 
                  type="text" 
                  id="backlog" 
                  name="backlog" 
                  value={formData.backlog} 
                  onChange={handleChange} 
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                /> 
                </div>  
                <div className="flex-1 flex flex-col">
                  <label htmlFor="CGPA" className="text-gray-700">CGPA:</label>
                  <input 
                    type="number" 
                    id="CGPA" 
                    name="CGPA" 
                    value={formData.CGPA} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>


              </div>
              <div className="flex flex-col">
                <label htmlFor="eligible" className="text-gray-700">Eligible for Placement:</label>
                <select 
                  id="eligible" 
                  name="eligible" 
                  value={formData.eligible ? "YES" : "NO"} 
                  onChange={handleChange} 
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="placed" className="text-gray-700">Placed:</label>
                <select 
                  id="placed" 
                  name="placed" 
                  value={formData.placed ? "YES" : "NO"} 
                  onChange={handleChange} 
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnrollmentModal;

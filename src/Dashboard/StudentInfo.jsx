import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editStudent } from "../services/operations/studentsApi";
import { useNavigate, useParams } from "react-router-dom";

const StudentInfo = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Log the entire Redux state for debugging
  const students = useSelector((state) => state.students.students || []);
  const student = students.find(st => st._id === studentId);

  

  const [formData, setFormData] = useState({
    name: student?.name || '',
    Enrollment: student?.Enrollment || '',
    email: student?.email || '',
    branch: student?.additionalDetails?.branch || '',
    section: student?.additionalDetails?.section || '',
    placed: student?.additionalDetails?.placed || '',
    tenth:student?.additionalDetails?.tenth || '',
    twelth:student?.additionalDetails?.twelth || '',
    backlog:student?.additionalDetails?.backlog||' ',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        Enrollment: student.Enrollment,
        email: student.email,
        branch: student.additionalDetails?.branch,
        section: student.additionalDetails?.section,
        placed: student.additionalDetails?.placed,
        tenth:student?.additionalDetails?.tenth,
        twelth:student?.additionalDetails?.twelth,
        backlog:student?.additionalDetails?.backlog,
        eligible:student?.additionalDetails?.eligible,
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'placed' || name === 'eligible' ? value === 'YES' : value; // Convert 'YES'/'NO' string to boolean for 'placed' field
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleEdit = async() => {
        
      await dispatch(editStudent(token, studentId, formData));
      navigate(-1); // Navigate back after successful edit
   
  };

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">1. Personal Detail</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Name of the Student</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Enrollment No</label>
          <input
            type="text"
            name="Enrollment"
            value={formData.Enrollment}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Section</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Placed</label>
          <select
            name="placed"
            value={formData.placed ? 'YES' : 'NO'}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          >
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
        
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Tenth</label>
          <input
            type="text"
            name="tenth"
            value={formData.tenth}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Twelth</label>
          <input
            type="text"
            name="twelth"
            value={formData.twelth}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">backlog</label>
          <input
            type="text"
            name="backlog"
            value={formData.backlog}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          />
        </div>
        <div>
          <label className="block text-zinc-700 dark:text-zinc-300">Eligible</label>
          <select
            name="eligible"
            value={formData.eligible ? 'YES' : 'NO'}
            onChange={handleInputChange}
            className="mt-2 border border-zinc-300 rounded-md p-2 w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
          >
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-zinc-200 text-zinc-700 py-2 px-4 rounded-md mr-2 dark:bg-zinc-700 dark:text-zinc-300" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleEdit}>Update</button>
      </div>
    </div>
  );
};

export default StudentInfo;

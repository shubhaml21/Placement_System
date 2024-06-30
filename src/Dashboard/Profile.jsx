import { FaUserEdit } from "react-icons/fa"; 
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../Dashboard/settings/index";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const handleEdit = () => {
    navigate("/dashboard/editprofile");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-3xl font-bold mb-6 text-gray-800">Student Details</div>
        <div className="text-sm text-gray-600 mb-8">Home &gt; Students &gt; Student Details</div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            {user?.image && (
              <div className="rounded-full overflow-hidden w-16 h-16 shadow-md">
                <img src={user?.image} alt="User" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <div className="text-xl font-semibold text-gray-800">{user?.name}</div>
              <div className="text-sm text-gray-500">{user?.Enrollment}</div>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition transform hover:scale-105"
            onClick={handleEdit}
          > 
            <FaUserEdit className="text-lg" />
            <span>EDIT</span>
          </button>
        </div>
        
        <div className="mb-8">
          <div className="text-2xl font-bold text-gray-800 mb-4">General Details</div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">Enrollment Number</div>
              <div className="text-gray-500">{user?.Enrollment}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">Email</div>
              <div className="text-gray-500">{user?.email}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">Branch & Section</div>
              <div className="text-gray-500">{user?.additionalDetails?.branch || "N/A"}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">Year</div>
              <div className="text-gray-500">{user?.additionalDetails?.year || "N/A"}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-gray-800 mb-4">Academic Details</div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">CGPA</div>
              <div className="text-gray-500">{user?.additionalDetails?.CGPA || "N/A"}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">10th Mark's Percentage</div>
              <div className="text-gray-500">{user?.additionalDetails?.tenth || "N/A"}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">12th Mark's Percentage</div>
              <div className="text-gray-500">{user?.additionalDetails?.twelth || "N/A"}</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-gray-700">Backlogs</div>
              <div className="text-gray-500">{user?.additionalDetails?.backlog || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

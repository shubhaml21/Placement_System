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
    <div>
      <div class="bg-[#F8F8F8] p-6">
        <div class="text-3xl font-bold mb-4">STUDENT DETAILS</div>
        <div class="text-sm mb-6">Home > Students > Student Details</div>
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            {user?.image ? (
              <div className="bg-purple-600 p-3 rounded-full text-white font-bold">
                <img
                  src={user?.image}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
              </div>
            ) : null}
            <div>
              <div class="font-bold text-lg">{user?.name}</div>
              <div class="text-sm">{user?.Enrollment}</div>
            </div>
          </div>
          <button
            className="bg-purple-600 flex justify-center items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            onClick={handleEdit}
          > 
          <FaUserEdit />
            EDIT
          </button>
        </div>
        <div class="mb-6">
          <div class="text-xl font-bold mb-2">GENERAL DETAILS</div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <div>ENROLLMENT NUMBER</div>
              <div>{user?.Enrollment}</div>
            </div>
            <div class="flex justify-between">
              <div>EMAIL</div>
              <div>{user?.email}</div>
            </div>
            <div class="flex justify-between">
              <div>BRANCH & SECTION</div>
              <div>{user?.additionalDetails?.branch || "N/A"}</div>
            </div>
            <div class="flex justify-between">
              <div>YEAR</div>
              <div>{user?.additionalDetails?.year || "N/A"}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-xl font-bold mb-2">ACADEMIC DETAILS</div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <div>CGPA</div>
              <div>{user?.additionalDetails?.CGPA || "N/A"}</div>
            </div>
            <div class="flex justify-between">
              <div>10TH MARK'S PERCENTAGE</div>
              <div>{user?.additionalDetails?.tenth || "N/A"}</div>
            </div>
            <div class="flex justify-between">
              <div>12TH MARK'S PERCENTAGE</div>
              <div>{user?.additionalDetails?.twelth || "N/A"}</div>
            </div>
            <div class="flex justify-between">
              <div>BACKLOGS</div>
              <div>{user?.additionalDetails?.backlog || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

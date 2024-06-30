import { AiOutlineArrowRight } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  editEligibility,
  getPositionDetail,
} from "../services/operations/companyApi";
import {
  BiBuilding,
  BiInfoCircle,
  BiRupee,
  BiCalendarCheck,
  BiListCheck,
} from "react-icons/bi";
import Modal from "react-modal";
import PositionModal from "./addstudentmodal/PositionModal";
import AddCompanyPosition from "./addstudentmodal/AddCompanyPosition";

const CompanyInfo = () => {
  const { token } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [eligibilityData, setEligibilityData] = useState({
    CGPA: "",
    tenth: "",
    twelth: "",
    backlogs: "",
  });
  const dispatch = useDispatch();

  // Use useSelector to get positions from Redux state
  const positions = useSelector((state) => state.company.position);

  useEffect(() => {
    dispatch(getPositionDetail(token, companyId));
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const selectedCompany = companies.find(
      (company) => company._id === companyId
    );
    setCompany(selectedCompany);
    if (selectedCompany?.eligibility) {
      setEligibilityData({
        CGPA: selectedCompany.eligibility.CGPA || "",
        tenth: selectedCompany.eligibility.tenth || "",
        twelth: selectedCompany.eligibility.twelth || "",
        backlogs: selectedCompany.eligibility.backlogs || "",
      });
    }
  }, [companyId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEligibilityData({
      ...eligibilityData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    await dispatch(editEligibility(token, companyId, eligibilityData));
    setCompany((prevCompany) => ({
      ...prevCompany,
      eligibility: eligibilityData,
    }));
    setIsEditing(false);
    toast.success("Eligibility criteria updated successfully!");
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  function handleApply() {
    setIsModalOpen(true);
  }

  function NextModalopen() {
    setIsModalOpen(false);
  }

  function handleposition() {
    setIsPositionModalOpen(true);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8 relative">
      <h1 className="text-3xl font-bold mb-6">Company Details</h1>
      <div
        className="absolute right-8 top-3 bg-purple-300 dark:bg-purple-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-400 dark:hover:bg-purple-700 transition duration-200"
        onClick={() => navigate("/home")}
      >
        <AiOutlineArrowRight className="text-white" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-200">
          <div className="flex items-center justify-between mb-4">
            <BiBuilding className="text-3xl text-purple-500" />
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Company Name
            </div>
          </div>
          <div className="text-2xl font-medium capitalize">
            {company.companyName}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-200">
          <div className="flex items-center justify-between mb-4">
            <BiInfoCircle className="text-3xl text-purple-500" />
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Company Description
            </div>
          </div>
          <div className="text-2xl font-medium capitalize">
            {company.companyDescription}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-200">
          <div className="flex items-center justify-between mb-4">
            <BiListCheck className="text-3xl text-purple-500" />
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Company Type
            </div>
          </div>
          <div className="text-2xl font-medium capitalize">
            {company.companyType}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-200">
          <div className="flex items-center justify-between mb-4">
            <BiRupee className="text-3xl text-purple-500" />
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              CTC Package
            </div>
          </div>
          <div className="text-2xl font-medium capitalize">
            {company.packageAmount}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105 duration-200">
          <div className="flex items-center justify-between mb-4">
            <BiCalendarCheck className="text-3xl text-purple-500" />
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Date of Arrival
            </div>
          </div>
          <div className="text-2xl font-medium capitalize"> 
         
            {new Date(company.arrival_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="relative">
        {isAdmin ? (
          <button
            className="bg-purple-500 absolute right-2 bottom-4 text-white px-3 py-1  w-24  h-14 rounded-lg shadow hover:bg-purple-700 transition duration-200"
            onClick={handleposition}
          >
            Add Position
          </button>
        ) : (
          <button
            className="bg-purple-500 absolute right-2 bottom-4 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200"
            onClick={handleApply}
          >
            Apply
          </button>
        )}
      </div>

      {/* Positions Section */}
      <div className="mt-8 mb-2">
        <h2 className="text-2xl font-bold mb-4">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positions.map((position) => (
            <div
              key={position._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Position Title
                </div>
                <div className="text-lg font-medium capitalize">
                  {position.title}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Job Description
                </div>
                <div className="font-medium text-sm capitalize">
                  {position.description}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Requirement Skills
                </div>
                <div className="text-sm font-medium capitalize">
                  {position.requiredSkills}
                </div>
              </div> 
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Location
                </div>
                <div className="text-lg font-medium capitalize">
                  {position.location}
                </div>
              </div> 
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Salary
                </div>
                <div className="text-lg font-medium capitalize">
                  ${position.salary}
                </div>
              </div> 
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Last Date to Apply
                </div>
                <div className="text-lg font-medium capitalize">
                {new Date(position.applicationDeadline).toLocaleDateString()}
                </div>
              </div>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Eligibility Criteria</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                CGPA
              </label>
              <div className="text-lg">
                {company?.eligibility?.CGPA || "N/A"}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                10th Marks Percentage
              </label>
              <div className="text-lg">
                {company?.eligibility?.tenth || "N/A"}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                12th Marks Percentage
              </label>
              <div className="text-lg">
                {company?.eligibility?.twelth || "N/A"}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Backlogs
              </label>
              <div className="text-lg">
                {company?.eligibility?.backlogs || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {isAdmin && (
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <PositionModal
          isOpen={isModalOpen}
          onClose={NextModalopen}
          companyName={company.companyName}
        />
        <AddCompanyPosition
          isOpen={isPositionModalOpen}
          onClose={() => setIsPositionModalOpen(false)}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancelClick}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Edit Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                CGPA
              </label>
              <input
                type="number"
                name="CGPA"
                value={eligibilityData.CGPA}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                10th Marks Percentage
              </label>
              <input
                type="number"
                name="tenth"
                value={eligibilityData.tenth}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                12th Marks Percentage
              </label>
              <input
                type="number"
                name="twelth"
                value={eligibilityData.twelth}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Backlogs
              </label>
              <input
                type="number"
                name="backlogs"
                value={eligibilityData.backlogs}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 gap-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition duration-200"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CompanyInfo;

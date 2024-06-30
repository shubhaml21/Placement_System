import { BiUser, BiCalendarCheck, BiRupee } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCount } from "../../services/operations/companyApi";

const UCCard = ({ UC_Company }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {UC_Company.map((company, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-4 capitalize">{company.companyName}</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BsBuildingFillGear className="text-2xl text-indigo-500 mr-2" />
              <span className="text-gray-700">{company.companyType}</span>
            </div>
            <div className="flex items-center">
              <BiRupee className="text-2xl text-green-500 mr-2" />
              <span className="text-gray-700">{company.packageAmount.toLocaleString()} INR</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <BiCalendarCheck className="text-2xl text-blue-500 mr-2" />
            <span className="text-gray-700">{new Date(company.arrival_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-indigo-600 mr-2">{company.no_of_applicant || 0}</span>
            <span className="text-gray-600">students have applied</span>
          </div>
          <Link to={`/dashboard/companyinfo/${company._id}`}>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

UCCard.propTypes = {
  UC_Company: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      companyType: PropTypes.string.isRequired,
      packageAmount: PropTypes.number.isRequired,
      arrival_date: PropTypes.string.isRequired,
      no_of_applicant: PropTypes.number,
    })
  ).isRequired,
};

export default UCCard;

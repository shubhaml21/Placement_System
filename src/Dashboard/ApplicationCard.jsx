import React from 'react';
import { BiUser, BiEnvelope, BiCalendarCheck, BiBriefcase, BiBuilding } from 'react-icons/bi';

const ApplicationCard = ({ application }) => {
  const { user = {}, position = {}, company = {}, status, applicationDate } = application;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-transform transform hover:scale-105">
      <div className="flex items-center gap-4 mb-4">
        <BiUser className="text-3xl text-gray-600" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user?.name || 'N/A'}</h3>
          <p className="text-gray-500">{user?.email || 'N/A'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <BiBriefcase className="text-3xl text-gray-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-700">{position?.title || 'N/A'}</h3>
          <p className="text-gray-500">Position ID: {position?._id || 'N/A'}</p>
          <p className="text-gray-500">Package: ${position?.salary || 'N/A'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <BiBuilding className="text-3xl text-gray-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-700">Company: {company?.companyName || 'N/A'}</h3>
          <p className="text-gray-500">Company ID: {company?._id || 'N/A'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <BiCalendarCheck className="text-3xl text-gray-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-700">Status: {status || 'N/A'}</h3>
          <p className="text-gray-500">Applied on: {applicationDate ? new Date(applicationDate).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;

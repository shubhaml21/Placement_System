import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplications } from '../slices/applicationSlice';
import ApplicationCard from './ApplicationCard';
import Spinner from '../components/Loader/Spinner'; // Add your spinner component
import { BiSearch, BiFilterAlt } from 'react-icons/bi';

const ApplicationsList = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);
  const status = useSelector((state) => state.applications.status);
  const error = useSelector((state) => state.applications.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchApplications());
    }
  }, [status, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredApplications = applications.filter((application) => {
    const matchesName = application.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? application.status === filterStatus : true;
    return matchesName && matchesStatus;
  });

  if (status === 'loading') {
    return <Spinner />; // Display a spinner while loading
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // Display an error message
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Applications</h1>
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div className="relative mb-4 sm:mb-0 sm:mr-4">
          <BiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative">
          <BiFilterAlt className="absolute left-3 top-3 text-gray-500" />
          <select
            value={filterStatus}
            onChange={handleStatusChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="placed">Placed</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredApplications.map((application) => (
          <ApplicationCard key={application?._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;

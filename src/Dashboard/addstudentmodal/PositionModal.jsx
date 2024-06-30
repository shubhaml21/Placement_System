import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPositionDetail } from "../../services/operations/companyApi";
import { RxCross2 } from "react-icons/rx";
import { applyToCompany } from '../../services/operations/studentsApi';
import { toast } from 'react-toastify';

const PositionModal = ({ isOpen, onClose, companyName }) => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const { position, isLoading } = useSelector(state => state.company);
  const { token } = useSelector(state => state.auth);
  const [selectedPosition, setSelectedPosition] = useState(null);
 const userId=useSelector(state=>state.auth.user._id)
  useEffect(() => {
    if (isOpen) {
      dispatch(getPositionDetail(token, companyId));
    }
  }, [dispatch, isOpen, token, companyId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen w-screen">Loading...</div>;
  }

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const handleApply = () => {
    if (!selectedPosition) {
      toast.error("Please select a position before applying.");
      return;
    } 

    const formData = {
      companyId,
      positionId: selectedPosition,
      userId: userId, // Assuming user ID is stored in auth state
    };
    
    console.log("formData",formData);

    dispatch(applyToCompany(token, formData)); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="select-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black bg-opacity-50 flex"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              Open positions in {companyName}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <RxCross2 fontSize={25} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Select your desired position:
            </p>
            <ul className="space-y-4 mb-4">
              {position.map((pos, index) => (
                <li key={pos._id}>
                  <input
                    type="radio"
                    id={`job-${index}`}
                    name="job"
                    value={pos._id} // Change to pos._id to use the position ID
                    onChange={handlePositionChange}
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor={`job-${index}`}
                    className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold capitalize">
                        {pos.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>Description:</strong> {pos.description}</p>
                        <p><strong>Location:</strong> {pos.isRemote ? 'Remote' : pos.location}</p>
                        <p><strong>Salary:</strong> ${pos.salary}</p>
                        <p><strong>Skills:</strong> {pos.requiredSkills.join(', ')}</p>
                        <p><strong>Application Deadline:</strong> {new Date(pos.applicationDeadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleApply}
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionModal;

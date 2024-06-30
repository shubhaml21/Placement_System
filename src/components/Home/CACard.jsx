import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getappliedcompanies } from "../../services/operations/studentsApi";
import Spinner from "../Loader/Spinner";

const CACard = ({ CC_Company }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch(); 
  const {appliedcompany}=useSelector(state=>state.students)

  useEffect(() => {
    setLoading(true);
    dispatch(getappliedcompanies(token, userId)).then(() => setLoading(false));
  }, [dispatch, token, userId]);

  return (
    <div className="my-4 max-w-full">
      {loading ? (
        <Spinner />
      ) : (
        appliedcompany?.map((company, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{company.companyName}</h3>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-gray-700">{company.companyType}</span>
              </div>
              <div className="flex items-center">
                <BiRupee className="text-2xl text-green-500 mr-2" />
                <span className="text-gray-700">{company.packageAmount.toLocaleString()} INR</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Applied
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CACard;

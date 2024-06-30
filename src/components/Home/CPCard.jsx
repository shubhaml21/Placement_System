import React from "react";
import { BiRupee } from "react-icons/bi";

const CPCard = ({ CP_Company }) => {
  return (
    <div className="my-4 max-w-full">
      {CP_Company.map((company, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{company.name}</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-gray-700">{company.type}</span>
            </div>
            <div className="flex items-center">
              <BiRupee className="text-2xl text-green-500 mr-2" />
              <span className="text-gray-700">{company.ctc}</span>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Placed
          </button>
        </div>
      ))}
    </div>
  );
};

export default CPCard;

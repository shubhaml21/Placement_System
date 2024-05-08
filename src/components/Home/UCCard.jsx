import { BiUser } from "react-icons/bi";
import { BiCalendarCheck } from "react-icons/bi";
import { BiRupee } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";

const UCCard = ({ UC_Company }) => {
  return (
    <div className="my-4">
      {UC_Company.map((company) => {
        return (
          <div className=" rounded-md bg-[#F8F8F8] flex flex-col mt-2 p-3" alt={company.index}>
            <h2 className="text-center font-semibold border-b-4 text-neutral-700 ">
              {company.name}
            </h2>
            <div className="flex justify-start gap-3 p-2">
              <div className="text-medium flex justify-center items-center p-2">
                <BsBuildingFillGear className="text-xl" />
                <span className="text-sm text-gray-600"> {company.type}</span>
              </div>
              <div className="text-medium flex justify-center items-center p-2">
                <BiRupee className="text-xl"/>
                <span className="text-sm text-gray-600">
                  {" "}
                  {company.package}
                </span>
              </div>
              <div className="text-medium flex justify-center items-center p-2 ">
                <BiCalendarCheck className="text-xl"/>
                <span className="text-sm text-gray-600"> {company.date}</span>
              </div>
            </div>
            <div className="px-3 text-indigo-800 flex justify-start items-center">
              <span className=" font-semibold text-xl px-2">
                {company.no_of_applicant}
              </span>{" "}
              students have applied
            </div> 
            <Link to={company.link}>
            <button className="w-full rounded bg-[#004085] text-white font-semibold py-2 mt-4">
              UPCOMING 
            </button>
            </Link>
           
          </div>
        );
      })}
    </div>
  );
};

export default UCCard;

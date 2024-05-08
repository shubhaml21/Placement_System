import React from "react";
import { BiRupee } from "react-icons/bi";
const CPCard = ({ CP_Company }) => {
  return (
    <div className="my-4 max-w-full">
      {CP_Company.map((company) => {
        return (
          <div
            key={company.name}
            className="rounded-md bg-[#F8F8F8] flex justify-between items-center mt-2 p-3 cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-medium ">{company.name}</h3>
              <div>
                Type:{" "}
                <span className="text-md text-sm font-semibold">
                  {company.type}
                </span>
              </div>
              <div className="flex items-center justify-center">
                CTC:
                <BiRupee className="text-xl" />
                <span className="text-md text-sm font-semibold ">
                  {company.ctc}
                </span>
              </div>
            </div>
            <button className="rounded bg-[#004085] text-white font-semibold p-2">
              Placed
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CPCard;

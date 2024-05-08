import React from "react";
import UCCard from "../components/Home/UCCard";
import CACard from "../components/Home/CACard";
import CPCard from "../components/Home/CPCard";

const StudentDashboard = () => {
  const UC_Company = [
    {
      name: "INFOSYS", 
      type: "SERVICE based",
      package: "3,60,000",
      date: "02 FEB 2022",
      no_of_applicant: "2",
      link: "https://www.infosys.com/"
    },
    {
      name: "TCS", 
      type: "SERVICE based",
      package: "4,00,000",
      date: "15 MAR 2022",
      no_of_applicant: "3",
      link: "https://www.tcs.com/"
    },
    {
      name: "Google", 
      type: "PRODUCT based",
      package: "10,00,000",
      date: "20 APR 2022",
      no_of_applicant: "5",
      link: "https://www.google.com/"
    },
    {
      name: "Microsoft", 
      type: "PRODUCT based",
      package: "8,50,000",
      date: "10 MAY 2022",
      no_of_applicant: "4",
      link: "https://www.microsoft.com/"
    },
    {
      name: "Amazon", 
      type: "PRODUCT based",
      package: "9,00,000",
      date: "25 JUN 2022",
      no_of_applicant: "6",
      link: "https://www.amazon.com/"
    }
  ];
  
  const CC_Company = [
    {
      name: "Google",
      type: "product",
      ctc: "12,00,000"
    },
    {
      name: "Facebook",
      type: "product",
      ctc: "11,50,000"
    },

  ];
  
   const CP_Company=[
    {
      name: "goldsman Sacs",
      type: "product",
      ctc: "12,00,000"
    },
    {
      name: "capegemini",
      type: "product",
      ctc: "11,50,000"
    },
   ]

   
  
    

    
  
  return (
    <div className="">
      {/* section 1  */}
      <div className="flex flex-col bg-[#F8F8F8] rounded-md  gap-2 p-2">
        <h1 className=" text-3xl font-bold">
          WELCOME TO, <br></br>{" "}
          <span className="text-2xl  text-[#476ab0] font-bold ">
            PLACEMENT PORTAL
          </span>
        </h1>
        <p className="text-gray-800 text-opacity-50">
          Here you get all details about the upcoming company visiting and all
          the there package details
        </p>
      </div>

      {/* section 2 */}
      <div className="flex gap-1 bg-white mt-2 p-2"> 
      <div className="w-6/12">
      <h2 className="text-xl font-semibold bg-white flex text-amber-700">UPCOMING COMPANY</h2>
        <UCCard  UC_Company={UC_Company}/> 
      </div> 
      <div className="w-6/12">  
      <h2 className="text-xl font-semibold bg-white flex  text-amber-700"> COMPANY APPLIED</h2>
          <CACard CC_Company={CC_Company}/>  
          <h2 className="text-xl font-semibold bg-white flex text-amber-700"> COMPANY PLACED</h2>
          <CPCard CP_Company={CP_Company}/> 
      </div>
         
      </div> 

    </div>
  );
};

export default StudentDashboard;

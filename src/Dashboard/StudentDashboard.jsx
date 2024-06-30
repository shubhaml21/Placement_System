import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UCCard from "../components/Home/UCCard";
import CACard from "../components/Home/CACard";
import CPCard from "../components/Home/CPCard";
import { getAllCompanies } from "../services/operations/companyApi";

const StudentDashboard = () => { 
  const dispatch=useDispatch();
  const {token}=useSelector(state=>state.auth);
  // Get companies from Redux store
  const UC_Company = useSelector(state => state.company.companies);
  useEffect(()=>{
    console.log(UC_Company)
    dispatch(getAllCompanies(token))
  },[dispatch,token]);


  const CC_Company = useSelector(state=>state.students);

   
  const CP_Company = [
    {
      name: "Goldman Sachs",
      type: "product",
      ctc: "12,00,000"
    },
    {
      name: "Capgemini",
      type: "product",
      ctc: "11,50,000"
    },
  ];

  return (
    <div className="">
      {/* section 1  */}
      <div className="flex flex-col bg-[#F8F8F8] rounded-md gap-2 p-2">
        <h1 className=" text-3xl font-bold">
          WELCOME TO, <br></br>
          <span className="text-2xl text-[#3a4f7a] font-bold">
            PLACEMENT PORTAL
          </span>
        </h1>
        <p className="text-gray-800 text-opacity-50">
          Here you get all details about the upcoming company visiting and all
          their package details
        </p>
      </div>

      {/* section 2 */}
      <div className="flex gap-1 bg-white mt-2 p-2">
        <div className="w-8/12">
          <h2 className="text-xl font-semibold bg-white flex text-amber-700">UPCOMING COMPANY</h2>
          <UCCard UC_Company={UC_Company} />
        </div>
        <div className="w-6/12">
          <h2 className="text-xl font-semibold bg-white flex text-amber-700"> COMPANY APPLIED</h2>
          <CACard CC_Company={CC_Company} />
          <h2 className="text-xl font-semibold bg-white flex text-amber-700"> COMPANY PLACED</h2>
          <CPCard CP_Company={CP_Company} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

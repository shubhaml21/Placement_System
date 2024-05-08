import { AiOutlineClose } from "react-icons/ai"; 
import { IoClose } from "react-icons/io"; 
import { AiOutlinePlus } from "react-icons/ai"; 
import React from "react";
import { useState } from "react";

const CompanyDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dummyData = [
    {
      name: "Amazon",
      type: "PRODUCT",
      date: "18 Jun 2023",
      ctc: "1000000000",
      year: "2023",
    },
    {
      name: "Google",
      type: "PRODUCT",
      date: "13 Jan 2022",
      ctc: "100000",
      year: "2023",
    },
    {
      name: "Infosys",
      type: "SERVICE",
      date: "02 Feb 2022",
      ctc: "70000",
      year: "2023",
    },
  ];

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyLogoURL: "",
    companyWebsiteURL: "",
    arrivalDate: "",
    packageValue: "",
    year: "",
    cgpaEligibility: "",
    tenthPercentageEligibility: "",
    twelthPercentageEligibility: "",
    backlogs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAddCompany = (e) => {
    // Make API call with formData
    e.preventDefault();
    console.log(formData);
    // Clear input fields if needed
    closeModal();
  };

  return (
    <div className="bg-[#F8F8F8] text-white p-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest text-[#333333] mb-2">
          Company's List
        </h1>
        <nav aria-label="breadcrumb">
          <ol className="list-none p-0 inline-flex text-sm">
            <li className="flex items-center">
              <a
                href="/dashboard/home"
                className="text-black hover:text-neutral-500"
              >
                Dashboard
              </a>
              <span className="mx-2 text-black">/</span>
            </li>
            <li className="flex items-center">
              <a
                href="/dashboard/company"
                className="text-black hover:text-neutral-500"
              >
                Companies
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#333333]">
          No. of Companies (4)
        </h2>
      </div>
      <div className="mb-6">
        <button
          onClick={openModal}
          className="bg-[#004085]  gap-2 hover:bg-[#0077B6] text-white py-2 px-4 rounded inline-flex items-center"
        >
          Add New Company
          <AiOutlinePlus />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#004085]">
              <th className="text-white py-2 px-2">Name</th>
              <th className="text-white py-2 px-2">Type</th>
              <th className="text-white py-2 px-2">Date of Arrival</th>
              <th className="text-white py-2 px-2">CTC</th>
              <th className="text-white py-2 px-2">Year</th>
              <th className="text-white py-2 px-2">More Info</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index} className="bg-[#F8F8F8]">
                <td className="py-2 px-4 text-[#333333] ">{item.name}</td>
                <td className="py-2 px-4 text-[#333333] ">{item.type}</td>
                <td className="py-2 px-4 text-[#333333] ">{item.date}</td>
                <td className="py-2 px-4 text-[#333333] ">{item.ctc}</td>
                <td className="py-2 px-4 text-[#333333] ">{item.year}</td>
                <td className="py-2 px-4">
                  <button className="bg-blue-900 hover:bg-blue-700 text-white p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4m0 0h.01m-6 0h12M12 8h.01" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* chatgpt modal  */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="absolute top-0 right-0 pt-2 pr-2">
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              >
                <span className="sr-only">Close</span>
                <AiOutlineClose />
              </button>
            </div>
            <div className="text-left sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Company
                </h3>
                <div className="mt-5">
                  <div className="flex flex-col space-y-4 text-black ">
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
                      placeholder="Company Name"
                    />
                    <input
                      type="text"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Company Description"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.companyLogoURL}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Company Logo URL"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.companyWebsiteURL}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Company Website URL"
                    />
                    <input
                      type="date"
                      onChange={handleChange}
                      value={formData.arrivalDate}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Arrival Date"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.packageValue}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
                      placeholder="Package"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.year}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
                      placeholder="Year"
                    />
                    {/* <div className="flex flex-col gap-2">
                      <label
                        htmlFor="eligibility"
                        className="text-sm font-medium text-gray-700"
                      >
                        Eligibility
                      </label>
                      <select
                        id="cgpaEligibility"
                        name="cgpaEligibility"
                        value={formData.cgpaEligibility}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="" defaultValue={""}>
                          Select CGPA
                        </option>
                        <option value="above-7">Above-7</option>
                        <option value="above-8">Above-8</option>
                        <option value="above-9">Above-9</option>
                      </select>
                      <select
                        id="tenthPercentageEligibility"
                        name="tenthPercentageEligibility"
                        onChange={handleChange}
                        value={formData.tenthPercentageEligibility}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="" defaultValue={""}>
                          Select Tenth Percentage
                        </option>
                        <option value="above-70">Above-70</option>
                        <option value="above-80">Above-80</option>
                        <option value="above-90">Above-90</option>
                      </select>
                      <select
                        id="twelthPercentageEligibility"
                        name="twelthPercentageEligibility"
                        value={formData.twelthPercentageEligibility}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="" defaultValue={""}>
                          Select Twelth Percentage
                        </option>
                        <option value="above-70">Above-70</option>
                        <option value="above-80">Above-80</option>
                        <option value="above-90">Above-90</option>
                      </select>
                      <select
                        id="backlogs"
                        name="backlogs"
                        onChange={handleChange}
                        value={formData.backlogs}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="" defaultValue={""}>
                          Select Backlogs
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-500 transition ease-in-out duration-150 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAddCompany}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 transition ease-in-out duration-150 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;

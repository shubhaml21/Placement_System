import React from "react";

const AllStudents = () => {
  // Dummy data
  const students = [
    {
      initials: "SM",
      name: "Sandeep M",
      email: "1js15cs146@jsstateb.ac.in",
      branch: "CSE",
      section: "C",
      usn: "15JSCS146",
      cgpa: "8.5"
    },
    {
      initials: "SS",
      name: "Shithin Shetty",
      email: "1js15cs157@jsstateb.ac.in",
      branch: "CSE",
      section: "C",
      usn: "15JSCS157",
      cgpa: "8.5"
    },
    {
      initials: "UH",
      name: "Ullas HP",
      email: "1js15cs183@jsstateb.ac.in",
      branch: "CSE",
      section: "C",
      usn: "15JSCS183",
      cgpa: "8.5"
    },
    {
      initials: "VS",
      name: "Varun S Athreya",
      email: "1js15cs186@jsstateb.ac.in",
      branch: "CSE",
      section: "C",
      usn: "15JSCS186",
      cgpa: "8.5"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">STUDENT'S LIST</h1>
        <nav className="text-blue-600 text-sm mt-1">Home > Students</nav>
      </div>

      <div className="bg-[#F8F8F8] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">NO. OF STUDENT'S ({students.length})</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Student"
              className="bg-blue-900 h-10 px-4 rounded-lg text-white focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0zm0 0l6 6"></path>
              </svg>
            </button>
          </div>
          <button className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
            ADD NEW STUDENT
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-zinc-200">
            <thead className="text-xs text-zinc-400 uppercase bg-[#F8F8F8]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  BRANCH
                </th>
                <th scope="col" className="px-6 py-3">
                  SECTION
                </th>
                <th scope="col" className="px-6 py-3">
                  USN
                </th>
                <th scope="col" className="px-6 py-3">
                  CGPA
                </th>
                <th scope="col" className="px-6 py-3">
                  MORE INFO
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="bg-[#F8F8F8] border-b text-black ">
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">{student.initials} {student.name}</td>
                  <td className="px-6 py-4">{student.branch}</td>
                  <td className="px-6 py-4">{student.section}</td>
                  <td className="px-6 py-4">{student.usn}</td>
                  <td className="px-6 py-4">{student.cgpa}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-[#F8F8F8] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 0v9a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V9m11.25 0H8.25"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;

import React from "react";
import loginshot from "../Assets/loginshot.png";
import dashboardshot from "../Assets/dashboardshot.png";

const Home = () => {
  return (
    <div className="w-full h-screen m-0 p-0 box-border ">
      <div className=" w-full h-screen ">
        <body class="bg-gradient-to-r from-[#2980b9] to-[#2c3e50] text-white">
          <div class="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
            <div class="pt-24 px-20 pb-20">
              <h1 class="text-6xl  font-bold mb-4">WELCOME,</h1>
              <h2 class="text-4xl font-bold mb-10">TO PLACEMENT PORTAL</h2>
              <p class="text-lg leading-relaxed w-6/12">
                Placement Management System manages student information in the
                college with regard to placement. It has the facility of
                maintaining the details of the student, thereby reducing the
                manual work. It will save time and energy which are spending in
                making reports and collecting data. Placement Management System
                can be accessed throughout the college with proper login
                provided.
              </p>
            </div>
            {/* image 1 */}
            <div className="absolute w-96 top-12 right-40  object-cover rounded-lg scale-1.1 transition all duration  shadow-lg pt-14">
              <img
                src={loginshot}
                alt="login"
                className="rounded-lg  scale-[1.1] transition-all duration "
              />
            </div>
            {/* image 2 */}
            <div className="absolute w-96 top-48 right-10  object-cover rounded-lg scale-1.1 transition all duration  shadow-lg pt-16">
              <img
                src={dashboardshot}
                alt="login"
                className="rounded-lg  scale-[1.1] transition-all duration "
              />
            </div>
          </div>
       

        <div class=" text-white p-10">
          <h1 class="text-4xl font-bold text-center mb-8">
            WHY IS IT REQUIRED?
          </h1>
          <div class="space-y-4  text-center">
            <p>
              Manual Placement which is done at various colleges is by human
              intervention due to which there is a maximum chance of errors.
              Placement officers have to manage the student’s profile and their
              documents and also have to collect the information of various
              companies who comes for recruitment. They have to arrange profiles
              of students according to various streams and notify them each time
              according to company requirements. They are also required to
              submit the information of students and if any changes or updates
              are required in the profile of any student, it has to be done
              manually. This process is so difficult and tedious when the number
              of students increases. Therefore, a Placement Management System is
              very useful.
            </p>
            <p>
              Database Management System is a software for storing and
              retrieving users' data while considering appropriate security
              measures. It consists of a group of programs which manipulate the
              database. The DBMS accepts the request for data from an
              application and instructs the operating system to provide the
              specific data. In large systems, a DBMS helps users and other
              third-party software to store and retrieve data. DBMS allows users
              to create their own databases as per their requirement. It
              provides an interface between the data and the software
              application.
            </p>
            <p>
              Placement Management System is a web App which provides
              information on placement providers and the placements and also
              keeps up to date information of all students. It is a platform
              where students can view and assess their opportunities. The system
              will be having different types of interfaces for different type of
              users – Admin or Student.
            </p>
          </div>
        </div>  

          <div className="flex bg-gray-100 justify-between items-center text-black">
            <div className="text-medium  uppercase p-4">
              @ 2024 PLACEMENT MANAGEMENT SYSTEM
            </div> 
            <div className="text-medium uppercase p-4">
              ALL RIGHT RESERVED
            </div>
          </div>


        </body> 
      </div> 
    </div>
  );
};

export default Home;

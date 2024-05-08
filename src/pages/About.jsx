import React from "react";
import aboutimg from "../Assets/aboutimg.jpg";
import aboutimg1 from "../Assets/aboutimg1.jpg";
// About page

const About = () => {
  return (
    <div className="container px-4 pt-8">
      <div className="about flex mt-6 flex-wrap">
        <div className="left w-full  md:w-1/2">
          <h1 className="text-center text-4xl font-bold mb-6">About Us</h1>
          <hr className=" mb-6 mx-auto" />
          <p className="text-lg leading-relaxed mb-6">
            At IES, IPS Academy, we understand the challenges faced by placement
            officers in managing the placement process manually. With the
            increasing number of students and companies, the task becomes more
            daunting, leading to errors and inefficiencies. To address this
            issue, we have developed the Placement Management System, a web
            application designed to streamline the placement process.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our platform provides two logins: one for administrators and one for
            students. Students can easily access information about upcoming
            companies, apply for positions they are eligible for, and manage
            their profiles, including basic details, academic records, and
            placement history. They can also select from multiple job offers
            with ease.
          </p>
        </div>
        <div className="right w-full md:w-1/2">
          <img src={aboutimg} alt="About" className="w-full" />
        </div>
      </div>

      <div className="mission flex flex-wrap mt-12">
        <div className="left w-full md:w-1/2">
          <img src={aboutimg1} alt="Mission" className="w-full" />
        </div>
        <div className="right w-full md:w-1/2">
          <h1 className="text-center text-4xl font-bold mb-6">
            Mission Statement
          </h1>
          <hr className=" mb-6 mx-auto" />
          <p className="text-lg leading-relaxed mb-6">
            At IES, IPS Academy, our mission is to revolutionize the placement
            process by leveraging technology to reduce manual work and enhance
            efficiency. We aim to provide a user-friendly platform that empowers
            both students and administrators to manage the placement process
            seamlessly.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Through our Placement Management System, we strive to simplify the
            process of identifying eligible students for recruitment drives,
            streamline the management of student and placement records, save
            time for placement officers and faculty members by automating
            routine tasks, enhance the overall placement experience for students
            by providing easy access to relevant information and opportunities,
            and continuously evolve our platform to meet the changing needs of
            educational institutions and employers.
          </p>
        </div> 
       
      </div>
      <div className="flex bg-gray-100 justify-between items-center text-black">
        <div className="text-medium  uppercase p-4">
          @ 2024 PLACEMENT MANAGEMENT SYSTEM
        </div>
        <div className="text-medium uppercase p-4">ALL RIGHT RESERVED</div>
      </div>
    </div>
  );
};

export default About;

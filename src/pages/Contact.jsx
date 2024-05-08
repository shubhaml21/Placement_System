import React from 'react';
import contactImage from "../Assets/contact.jpg";

const Contact = () => {
  return ( 
    <div className=" bg-stone-50  py-12 h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 mb-4">Feel Free to contact us any time. We will get back to you as soon as we can!</p>
          <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" placeholder="Name" />
          <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" placeholder="Email" />
          <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" placeholder="Message"></textarea>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

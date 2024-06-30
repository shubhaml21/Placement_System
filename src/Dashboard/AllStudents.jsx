import { TiUserDelete } from "react-icons/ti";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents, deleteStudent } from '../services/operations/studentsApi';
import EnrollmentModal from './addstudentmodal/EnrollmentModal';
import ConfirmationModal from '../components/modal/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUser, faEnvelope, faGraduationCap, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const AllStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  const students = useSelector(state => state.students.students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMoreInfo = (studentId) => {
    navigate(`/dashboard/student/${studentId}`);
  };

  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  });

  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 1, tension: 170, friction: 26 },
    delay: 200,
  });

  const handleDeleteStudent = (studentId) => {
    dispatch(deleteStudent(token, studentId, () => {
      setConfirmationModal(null);
      dispatch(getAllStudents());
    }));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      <animated.div style={headerSpring} className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Students</h1>
        <button
          onClick={handleOpenModal}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg transition-transform transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          Add Student
        </button>
      </animated.div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <EnrollmentModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <animated.div
            key={student._id}
            style={cardSpring}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{student?.name}</h2>
            <p><FontAwesomeIcon icon={faUser} className="mr-2" /> {student?.Enrollment}</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {student?.email}</p>
            <p><FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> {student?.additionalDetails?.branch ?? 'N/A'}</p>
            <p><FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> {student?.additionalDetails?.section ?? 'N/A'}</p>
            <p><FontAwesomeIcon icon={faCheckCircle} className="mr-2" style={{ color: student?.additionalDetails?.eligible ? 'green' : 'gray' }} /> Eligible for Placement: {student?.additionalDetails?.eligible ? 'Yes' : 'No'}</p>
            <p><FontAwesomeIcon icon={faTimesCircle} className="mr-2" style={{ color: student?.additionalDetails?.placed ? 'green' : 'gray' }} /> Placed: {student?.additionalDetails?.placed ? 'Yes' : 'No'}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleMoreInfo(student?._id)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-lg transition-transform transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                More Info
              </button>
              <button
                className="flex items-center justify-center rounded-full px-5 mt-3 text-center transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You want to Delete this User",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () => handleDeleteStudent(student?._id),
                  btn2Handler: () => setConfirmationModal(null),
                })}
              >
                <TiUserDelete size={35} className="bg-red-500 hover:bg-red-600 p-2 rounded-full" />
              </button>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;

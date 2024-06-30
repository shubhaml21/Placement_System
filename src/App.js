import { Route, Routes, useNavigate } from "react-router-dom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Signup from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./Dashboard/StudentDashboard";
import CompanyDetail from "./Dashboard/CompanyDetail";
import LogoutModal from "./components/modal/LogoutModal";
import Profile from "./Dashboard/Profile";
import AllStudents from "./Dashboard/AllStudents";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CheckAuth from "./components/Auth/CheckAuth";
import { useSelector } from "react-redux";
import EditProfile from "./Dashboard/settings/EditProfile";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import CompanyInfo from "./Dashboard/CompanyInfo";
import StudentInfo from "./Dashboard/StudentInfo";
import ApplicationsList from "./Dashboard/ApplicationsList";


function App() { 
  const {isAuth}=useSelector((state)=>state.auth);
  const navigate=useNavigate()
  return (
    <div className="App relative">
     <div className="fixed w-full z-30 block"> <Navbar /></div>
      <Routes>
        {/* <Route path="/auth" element={<CheckAuth/>}/> */} 
       
        <Route path="/" element={ <OpenRoute>
       <div> <Home /></div>
        </OpenRoute>
        } />
        <Route path="/login" element={
        <OpenRoute><Login /></OpenRoute>
        } />
        <Route path="/about" element={ <OpenRoute><About /></OpenRoute>}></Route>
        <Route path="/contact" element={ <OpenRoute><Contact /></OpenRoute>}></Route>
        <Route path="/*" element={ <OpenRoute><NotFound /></OpenRoute>}></Route>
        <Route path="/signup" element={ <OpenRoute><Signup /></OpenRoute>}></Route>
        
        {/* nested routes  */}
        {  
          <Route path="/dashboard/*" element={
            <PrivateRoute>
              <div className="pt-16"><Dashboard /></div>
            </PrivateRoute>}>
          <Route path="home" element={<StudentDashboard />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="company" element={<CompanyDetail />} />
          <Route path="myprofile" element={<Profile />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="companyinfo/:companyId" element={<CompanyInfo />} />
          <Route path="student/:studentId" element={<StudentInfo />} />
          <Route path="applied" element={<ApplicationsList/>} />
        </Route>
        
         

        }
        
      </Routes>
    </div>
  );
}

export default App;

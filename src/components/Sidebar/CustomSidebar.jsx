import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import React from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../modal/LogoutModal";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/authApi";
import LogoutModal from "../modal/LogoutModal";

const CustomSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[ismodalopen,setIsModalOpen]=useState(false);

  const isAdmin = localStorage.getItem("isAdmin");
  console.log("isAdmin", isAdmin); 
 function handleLogout(){
     dispatch(logout(navigate));
 }

  return (
    <div>
      <ProSidebar className="h-full w-full ">
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem
            icon={<AiFillHome />}
            component={<Link to="/dashboard/home" />}
          >
            Home
          </MenuItem>
          {isAdmin && (
            <MenuItem
              icon={<BsFillBuildingsFill />}
              component={<Link to="/dashboard/company" />}
            >
              {" "}
              Company
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem
              icon={<AiOutlineUsergroupDelete />}
              component={<Link to="/dashboard/students" />}
            >
              Students
            </MenuItem>
          )}

          <MenuItem
            icon={<AiFillFire />}
            component={<Link to="/dashboard/applied" />}
          >
            {" "}
            Applied
          </MenuItem>
          <MenuItem
            icon={<AiFillCheckCircle />}
            component={<Link to="/dashboard/placed" />}
          >
            {" "}
            Placed
          </MenuItem>
          <MenuItem
            icon={<AiOutlineUser />}
            component={<Link to="/dashboard/myprofile" />}
          >
            {" "}
            Profile
          </MenuItem>
          <MenuItem 
        
            icon={<BiLogOutCircle />}
            onClick={handleLogout}
          >
            {" "}
            Logout
          </MenuItem>
        </Menu>
         
      </ProSidebar>
    </div>
  );
};

export default CustomSidebar;

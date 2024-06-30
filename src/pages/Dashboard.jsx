import React from 'react'
import CustomSidebar from '../components/Sidebar/CustomSidebar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className="flex ">
    <div className='fixed'><CustomSidebar /></div>
    <div className="flex-1 overflow-x-hidden">
      <div className=" w-full max-w-[1000px] py-3 ml-64 ">
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard

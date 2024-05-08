import React from 'react'
import CustomSidebar from '../components/Sidebar/CustomSidebar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className="flex">
    <CustomSidebar />
    <div className="flex-1 overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1000px] py-3">
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard

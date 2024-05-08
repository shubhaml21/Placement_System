import React from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"

const Profilepage = () => { 
    const {user}=useSelector((state)=>state.auth); 
    
  return (
    <button>
       <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.fullName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
    </button>
  )
}

export default Profilepage

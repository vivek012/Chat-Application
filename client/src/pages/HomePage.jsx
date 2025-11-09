import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import NewFile from '../components/NewFile'

const HomePage = () => {

  const [selectedUser , setSelectedUser] = useState(false);

  return (
    <div className='w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={` grid   grid-cols-1 backdrop-blur-xl h-[100%] border-2 border-white overflow-hidden rounded-2xl  relative ${selectedUser? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]': 'md:grid-cols-2' }`} >
        <Sidebar/>
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <NewFile></NewFile>
      </div>
    </div>
  )
}

export default HomePage

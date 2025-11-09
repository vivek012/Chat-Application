import React, { useEffect , useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  // Get all the images from the messages and set them to state
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>


      <div className="flex flex-col items-center  gap-2 pt-16">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='mx-auto gap-2  font-medium text-2xl  flex items-center'>
          {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 bg-green-400 rounded-full gap-2"></span>}
          {selectedUser.fullName}
        </h1>
        <p className='px-8 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4' />

      <div className="px-5 text-xs">
        < p className='text-xl'>Media</p>
        <div className="mt-2 max-h-[170px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
          {msgImages.map((url, index) => (
            <div key={index} onClick={() => window.open(url)} className="cursor-pointer rounded">
              <img src={url} alt="" className='h-full rounded-md' />

            </div>

          ))}
        </div>
      </div>
      {/* logout----------------------------- */}
      <button onClick={()=> logout()} className=' text-white absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to violet-800  border-none rounded-full text-sm font-light py-2 px-20 cursor-pointer '>Logout</button>

    </div>
  )
}

export default RightSidebar;

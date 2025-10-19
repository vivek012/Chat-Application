import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({selectedUser, setSelectedUser}) => {

  const scrollEnd = useRef();

  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior : "smooth"})
    }
  }, [])

  return selectedUser? (
   
    <div className='h-full backdrop-blur-lg overflow-scroll relative '>

      {/* ------------------ header ---------------- */}
       <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full"/>
        <p className='flex-1 text-lg text-white flex items-center gap-2 '>
          Martin Johnson
          <span className="w-2 h-2  bg-green-500 rounded-full"></span>
        </p>
        <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden max-w-7" />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* ------------------- Chat area ------------------- */}

      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index)=>{
           return <div key={index} className={`flex item-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9'&& 'flex-row-reverse'}`}>
            {msg.image? (
              <img src={msg.image} alt="" className="max-w-[230px] border border-grey-700 rounded-lg  overflow-hidden mb-8 " />
            ):(
              <p className={` p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId !== '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none ': 'rounded-bl-none '}` }>{msg.text}</p>
            )}

            <div className="text-center text-xs">
              <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin } alt="" className="w-7 rounded-full" />
              <p className="text-gray-400">{formatMessageTime(msg.createdAt) }</p>
            </div>
          </div>
        })}

        <div ref={scrollEnd} className=""></div>
      </div>
      {/* --------------- Bottom Area -------------- */}
        <div className="absolute bottom-0 left-0 right-0  items-center p-3 overflow-hidden flex  justify-between w-full gap-3 ">
          <div className=" flex-1  items-center px-4 flex gap-4 bg-gray-100/12 rounded-full">
            <input className='flex-1 bg-transparent border-none outline-none p-3 rounded-lg  placeholder-green-400 text-white text-lg' type="text" placeholder='send message...' />
            <input type="file"  id='image'accept='image/png, image/jpeg' hidden />
            <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
            </label>

          </div>
          <img src={assets.send_button} alt="" className='w-10 cursor-pointer'/>
        </div>

    </div>
    
  ) : (
    <div className="flex  flex-col gap-2 max-md:hidden bg-white/10 items-center justify-center text-gray-500">  
    <img src={assets.logo_icon} alt="" className='max-w-16'/>
    <p className="text-white font-medium text-lg">Chat anyTime, anywhere!!...</p>
    </div>
  )
}

export default ChatContainer

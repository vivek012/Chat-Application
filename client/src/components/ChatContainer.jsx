import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)

  const { authUser, onlineUsers } = useContext(AuthContext)

  const scrollEnd = useRef();

  const [input, setInput] = useState('');


  //   Handle  sending a Message

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }


  // Function to handle sending an image 
  const handleSendImage = async(e)=>{
    const file = e.target.files[0];
    if(!file || !file.type.startsWith("image/")){
      toast.error("select an image file")
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async ()=>{
      await sendMessage({image: reader.result})
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

useEffect(()=>{
  if(selectedUser){
    getMessages(selectedUser._id)
  }
},[selectedUser])


  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return selectedUser ? (

    <div className='h-full backdrop-blur-lg overflow-scroll relative '>

      {/* ------------------ header ---------------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className='flex-1 text-lg text-white flex items-center gap-2 '>
          {selectedUser.fullName}
         {onlineUsers.includes(selectedUser._id) &&<span className="w-2 h-2  bg-green-500 rounded-full"></span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden max-w-7" />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* ------------------- Chat area ------------------- */}

      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((msg, index) => {
          return <div key={index} className={`flex item-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className="max-w-[230px] border border-grey-700 rounded-lg  overflow-hidden mb-8 " />
            ) : (
              <p className={` p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId !== authUser._id ? 'rounded-br-none ' : 'rounded-bl-none '}`}>{msg.text}</p>
            )}

            <div className="text-center text-xs">
              <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className="w-7 rounded-full" />
              <p className="text-gray-400">{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        })}

        <div ref={scrollEnd} className=""></div>
      </div>
      {/* --------------- Bottom Area -------------- */}
      <div className="absolute bottom-0 left-0 right-0  items-center p-3 overflow-hidden flex  justify-between w-full gap-3 ">
        <div className=" flex-1  items-center px-4 flex gap-4 bg-gray-100/12 rounded-full">
          <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} className='flex-1 bg-transparent border-none outline-none p-3 rounded-lg  placeholder-green-400 text-white text-lg' type="text" placeholder='send message...' />
          <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer" />
          </label>

        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-10 cursor-pointer' />
      </div>

    </div>

  ) : (
    <div className="flex  flex-col gap-2 max-md:hidden bg-white/10 items-center justify-center text-gray-500">
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className="text-white font-medium text-lg">Chat anyTime, anywhere!!...</p>
    </div>
  )
}

export default ChatContainer


import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const Chatcontext = createContext();

export const ChatProvider = ({children})=>{

const [messages , setMessages] = useState([]);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null)
const [unseenMessages, setUnseenMessages] = useState({})


const {socket , axios} = useContext(AuthContext);


//  function to get all users for sidebar
const getUsers = async () =>{
    try {
        await axios.get("")
    } catch (error) {
        
    }
}


const value = {

}

    return(
    <Chatcontext.Provider value= {value}>
        {children}
    </Chatcontext.Provider>
    )
}
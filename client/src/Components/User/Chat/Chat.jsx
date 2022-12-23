import {useState,useRef,useEffect} from 'react'
import Navbar from "../Navbar";
import { Button,Avatar } from "@material-tailwind/react";
import {io} from "socket.io-client";
import axios from "axios";
import {format} from "timeago.js";
import FollowingsModal from "./FollowingsModal";
function Chat() {
  const [newMessage,setNewMessage] = useState(null) 
  const [onlineUsers,setOnlineUsers] = useState([])
  const sockeet = io('http://localhost:3000')              
  const socket = useRef()                   
  const scroll = useRef()                 
  const localUser = JSON.parse( localStorage.getItem('user'))
  const [chatUsers,setChatUsers] = useState([])                 
  const [chatUser,setChatUser] = useState('')                
  const [messages,setMessages] = useState([])                                                                        
  const [messageSented,setMessageSented] = useState(false) 
  const [receiveMessage,setReceiveMessage] = useState({})
  const [showModal,setShowModal] = useState(false)
 
  console.log(chatUsers,'on;lineee');  
  console.log(messages,'mesgesss');

  useEffect(()=>{
    socket.current = io('http://localhost:8800')   
    socket.current.emit('new-user-add', localUser._id)
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users)    
    })
  },[])             

  useEffect(()=>{
    axios.get(`http://localhost:8000/getChatUsers/${localUser._id}`).then((res)=>{
        setChatUsers(res.data.data)  
    })
  },[])

  const handleOnClick = (obj)=>{
      setChatUser(obj)
      axios.get(`http://localhost:8000/getMessages/${localUser._id}/${obj.id}`).then((res)=>{
       setMessages(res.data.messages) 
      })
  }
  
  const handleSentMessage = (recieverId)=>{
     axios.post(`http://localhost:8000/addMessage`,{messagerId:localUser._id,message:newMessage,timeStamp: new Date(),receiverId:chatUser.id})
     .then((res)=>{
        /** Sent message to socket server **/
    socket.current.emit('sent-message',{receiverId:chatUser.id,messageData:{messagerId:localUser._id,message:newMessage,timeStamp:new Date()}})

       setMessages(res.data.messages)
     })
  }  
  /** Sent message to socket server **/
  useEffect(()=>{
    console.log('oooo');
    if(messageSented){
    }
  },[messageSented])
   
   /** Receive message to socket server **/
  useEffect(()=>{   
    console.log('77777x77');
    socket.current.on('receive-message',(data)=>{
      console.log('sampleeee');
    })   
  },[])    

  useEffect(()=>{ 
    setMessages([...messages,receiveMessage])
  },[receiveMessage]) 
    
  useEffect(()=>{ 
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  useEffect(()=>{ },[messages])

  return (
    <>
     <Navbar />
    <div className="flex justify-center mt-4">
      <div className="chat-div bg-slate-300 w-80  border border-black-500">
        <div  className="flex w-80 h-16 border border-cyan-500 bg-black mr-1">
         <h1 className="text-3xl text-white mt-3 ml-28">Inbox</h1>         
          <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setShowModal(true)}}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-24 mt-4">
           <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>
        <div >
          { chatUsers.map((element)=>{

      return element.user ? <div className="flex mt-4 ml-3 cursor-pointer" onClick={()=>{handleOnClick(element)}}> 
            <img className="w-12 h-12 rounded-full ml-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
            <h1 className="text-xl mt-2 ml-3 ">{element.user}</h1>
           </div>: null
            
          })
        
           } 
        </div>
      </div>
      
      <div className="chat-div bg-white w-96  border" style={{width:'40rem'}}>
        {chatUser?
          <>
        <div className="w-96 border-2 h-16" style={{width:'40rem'}}>
           <div className="flex ml-7 mt-2">
             {/* <img className="w-8 h-8 rounded-full ml-2 mt-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" /> */}
             <Avatar className="mt-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="avatar" variant="circular" size="sm" />

             <h1 className="text-xl mt-2 ml-3 ">{chatUser.user}</h1>
           </div>
           
        </div>
        <div className="border overflow-auto" style={{height:"30rem",width:'40rem'}}>
          { messages.map((element)=>{
      return element.messagerId == localUser._id?<>
          <div ref={scroll} className="w-56 h-20 mt-4 bg-cyan-100  ml-80 rounded-lg" style={{borderRadius:'28px',marginLeft:'24rem'}}>
            <h1 className="float-left ml-4 mt-2 text-lg">{element.message}</h1>
            <p className="float-right  mr-5 text-xs" style={{marginTop:'60px'}}>{format(element.timeStamp)}</p>
          </div>
          </>
          :
          <> 
          <div className="flex  ml-4" ref={scroll}>
          <Avatar className="mt-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="avatar" variant="circular" size="sm" />
            <div className="w-56 h-20 mt-4 bg-zinc-100 ml-2 rounded-lg" style={{borderRadius:'28px',maxHeight:'100px'}}>
             <h1 className="float-left ml-4 mt-2 text-lg">{element.message}</h1>
             <p className="float-right  mr-5 text-xs" style={{marginTop:'60px'}}>{format(element.timeStamp)}</p>
            </div>
          </div>
          </>
          })
            
}
        </div>
        <div className="h-16 border-2 flex justify-between" style={{width:'40rem'}}>
           <input type="text" onChange={(e)=>{setNewMessage(e.target.value)}} className="h-10 border-2 border-stone-400 ml-5 rounded-full mt-2 pl-3" placeholder="Message..." style={{width:'37rem'}}/>
          {newMessage ? <button onClick={handleSentMessage}  className="bg-blue-400 px-2  rounded-full text-white w-12 h-8 absolute pr-10 mr-16 mt-3 hover:bg-blue-600"  style={{marginLeft:'35rem'}}>Sent</button>:null}
          
        </div> 
        </> 
        :
        <div className="flex justify-center mt-36">
          <div>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-40 h-40 ml-9">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
           </svg>
           <h1>Sent your messages to your friends</h1>
          </div>
        </div>
        }
      </div>
      
    </div>
    {
      showModal? <FollowingsModal setShowModal={setShowModal} userId={localUser._id} setChatUsers={setChatUsers} chatUsers={chatUsers} setChatUser={setChatUser} setMessages={setMessages}/> : null
    }
    </>
    
  )
}

export default Chat

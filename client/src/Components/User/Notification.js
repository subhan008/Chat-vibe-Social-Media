import React,{useEffect,useState,useRef} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import {config} from "../../Config/config";

function NotificationModal({receiveNotif}) {

const socket = useRef()                   
const [notifications,setNotifications] = useState([])
const navigate = useNavigate()  
const user = JSON.parse( localStorage.getItem('user'))
 useEffect(()=>{
   axios.get(`http://localhost:8000/notification/${user._id}`,config).then((res)=>{
    if (res.data.err) {
      navigate('/Error-500')
    }
     setNotifications(res.data.data)
     
  })  
 },[])
console.log(notifications,'gbgbgg');

 useEffect(()=>{
  socket.current = io('http://localhost:8800')    
  socket.current.emit('new-user-add', user._id)
  
},[])    

 
  useEffect(()=>{ 
    console.log(receiveNotif,'hahhhhhh');
    setNotifications([receiveNotif,...notifications])
  },[receiveNotif]) 

  const handleCloseNotif = ()=>{
     axios.put(`http://localhost:8000/notification-seened/${user._id}`,config).then((res)=>{
      if (res.data.err) {
        navigate('/Error-500')
      }
         location.reload()
     })
  }
  return (
  
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center ">
                    Notifications
                  </h3>
                  <svg onClick={handleCloseNotif}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt- rounded-lg" style={{width:"30rem",height:'33rem'}}>
                  <div>
                    
                     {notifications ? notifications.map((element)=>{
                            
                           return                     <>  <div class="flex hover:bg-slate-100">
                            <img className="w-9 h-9 rounded-full ml- mt-5 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                             
                           <h1 className="float-left mt-6 text-base"><span className="font-semibold text-base">{element.user}</span> {element.text}</h1>
</div>
</>
                     }) : null
                     }
                  </div>
              
              
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-16">
                   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      
  
  )
}

export default NotificationModal

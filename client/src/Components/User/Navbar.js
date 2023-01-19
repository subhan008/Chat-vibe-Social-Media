import {useEffect,useState,useRef} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Tooltip} from "@material-tailwind/react";

function Navbar({setShowModal,setNotificationModal,receiveNotif}) {
const navigate = useNavigate()
const socket = useRef()                   
const user = JSON.parse( localStorage.getItem('user'))
const [notifCount,setNotifCount] = useState([])

let count = 0
const onLogout = ()=>{
  localStorage.removeItem('user')
  localStorage.removeItem('userToken')

  navigate('/login')
}

useEffect(()=>{
   
   axios.get(`http://localhost:8000/notification/${user._id}`).then((res)=>{
     setNotifCount(res.data.data)
   })
},[])

notifCount.map((element)=>{
  if(element.seen == false){
    count = count + 1
  }
})

useEffect(()=>{
  console.log('9*9*7*9*');
  count = 10
},[receiveNotif])

console.log(notifCount,'countttttttt');
console.log(count,'ethhhhhh');
  return (    
    <nav className="nav  bg-white h-20 w-full" >
      <div className="p-6 ">
    <h2 className="float-left text-3xl font-semibold ml-28 ">Chat <span className="text-fuchsia-800 mr-5">vibe</span></h2>
 <div >
 <button onClick={()=>{if(window.confirm('Are you sure')){ onLogout() }}} class="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Logout
      </button> 
      </div>  
      <div className="flex float-right mt-2 mr-36">
        {/* <div className="flex"> 
        <input type=""  className="w-40 h-8 border-2 border-stone-400 rounded-l-lg hover:bg-sky-50 "/>
        <button className="w-9 h-8 bg-blue-400 mr-10 rounded-r-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

        </button>
        </div> */}
<Tooltip content="Search">
<a onClick={()=>{setShowModal(true)}} >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 mr-5 text-sky-500 cursor-pointer hover:text-sky-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</a> 
</Tooltip>
<Tooltip content="Notification">
<a onClick={()=>{setNotificationModal(true)}} >
{ count == 0?null:<div class="absolute w-5 h-3 bg-blue-300 rounded-full ml-5" style={{marginTop:'-7px',paddingBottom:'22px'}}>{count}</div>}
<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" h-7 mr-5 cursor-pointer text-sky-500 hover:text-sky-700">       
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>
</a> 
</Tooltip>

<Tooltip content="Inbox">

<svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>{navigate('/inbox')}} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 mr-4 cursor-pointer text-sky-500 hover:text-sky-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>
</Tooltip>
<Tooltip content="Profile">

<a onClick={()=>{navigate('/profile')}} href=""><svg  className=" h-7 text-sky-500 hover:text-sky-700  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
</a>  
</Tooltip>

      </div>
     
</div>
<div className="down-line  h-1 bg-blue-300"></div>
  </nav>
  
  )
}

export default Navbar

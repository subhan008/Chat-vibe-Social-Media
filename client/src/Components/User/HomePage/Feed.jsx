import React,{useEffect,useState,Fragment,useRef} from 'react'
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import Suggestions from "./Suggestions"
import NotificationModal from "../Notification";;
import Search from "./Search";
import axios from "axios";
import {format} from "timeago.js";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function homePage() {
  const navigate = useNavigate()
  const [notifModal,setNotifModal] = useState(false)
  const [feedPosts,setFeedPosts] = useState([])
  const [comment,setComment] = useState('')
  const [showModal,setShowModal] = useState(false) 
  const [open, setOpen] = useState(1);
  const [userData,setUserData] = useState({})
  const [notificationModal,setNotificationModal] = useState(false) 
  const [receiveNotif,setReceiveNotif] = useState({})
  const socket = useRef()                   
  let localUser = JSON.parse( localStorage.getItem('user') )

console.log(notificationModal ,'555555');
useEffect(()=>{
  return ()=>{}
},[feedPosts])

useEffect(()=>{
if(localUser){
      navigate('/')
    }
    else{   
      navigate('/login')
    }
},[])
    

  useEffect(()=>{
    axios.get(`http://localhost:8000/getAllPosts/${localUser._id}`).then((res)=>{
      setFeedPosts(res.data.posts)
      setUserData(res.data.userData)
    })
  },[])

useEffect(()=>{
  socket.current = io('http://localhost:8800')   
  socket.current.emit('new-user-add', localUser._id)
  
},[])    
  /** Receive message to socket server **/
  useEffect(()=>{   
    console.log('77777x77');
    socket.current.on('receive-notification',(data)=>{
      setReceiveNotif(data)
    })   
  },[])  
  
  const onLikeUnlike = (likedUserId,postId,postedUserId)=>{
    console.log('44444444444'); 
    axios.post(`http://localhost:8000/post-like-Unlike`,{postId,likedUserId,postedUserId:postedUserId,homePage:true}).then((res)=>{  
       setFeedPosts(res.data.data)
       if(res.data.liked){
        socket.current.emit('sent-notification',{receiverId:postedUserId,notifData:{user:localUser.fname,date:new Date(),text:'liked your post'}})
       }
    })
  }
  const onComment = (postId)=>{
    if(!comment==""){
      axios.put('http://localhost:8000/add-comment',{comment:comment,user:localUser.fname,postId:postId,profileImg:userData.profileImg
      ,date:new Date(),homePage:true})
      .then((res)=>{
          setFeedPosts(res.data.data)
          
      })
    }
    else{
      console.log('err');
    }
  }
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
    <Navbar  setShowModal={setShowModal} setNotificationModal={setNotificationModal} receiveNotif={receiveNotif}/>
     
    <div className="flex justify-between mt-5 overflow-auto "> 
     <div>
     
      <div className="w-60 h-60 ml-10 bg-gray-50 rounded-xl mt-11">

      </div>
     </div>
     <div>
       { 
        feedPosts.map((element)=>{
       return <>
        <div className="posts w-96 h-72 bg-gray-50 mx-auto pt-16 overflow-auto mt-">
        
        <div className="ml-1">
          <img className="w-9 h-9 rounded-full ml-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" style={{marginTop:'-47px'}}  />
          <h1 className="float-left ml-14 text-lg font-normal  " style={{marginTop:'-33px'}}>{element.userName}</h1> 
        </div>
        <img className="post-img  bg-blue-200 mt-3" src={`http://localhost:8000/images/${ element.image }`} alt="" />
        <div className="flex mt-3 ml-3">
        { element.likedUsers.includes(localUser._id)?
                      <svg onClick={()=>{ onLikeUnlike(localUser._id,element._id,element.userId) }} className="w-8 h-8 cursor-pointer fill-red-500 text-red-500"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                         </svg>
                         :
                         <svg onClick={()=>{ onLikeUnlike(localUser._id,element._id,element.userId) }} xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
        } 
                         
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" ml-4  w-8 h-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg> 
                    </div>
                      <p  className="font-semibold text-base float-left ml-4 mt-3 ">{element.like} Likes</p>
                      <div className="flex mt-10 ml-4 ">  
                        <h1 className="font-medium text-justify ">{element.userName}<span className="ml-1 font-normal text-slate-600 ">
                          {element.caption}
                          </span></h1>
                       
                      </div>
                         
         </div>
       
          <div className="border-2 border-black-600  bg-gray-50" style={{width:"40rem",height:''}}>
            {/* <p className="float-left ml-4 text-gray-500 mt-2">View all {element.comment.length} comments</p> */}
           <Fragment>
      <Accordion open={open === 1} >
        <AccordionHeader onClick={() => handleOpen(1)} className="h-2 text-base font-normal">
        <p className="float-left ml-4 text-gray-500 mt-2">View all {element.comment.length} comments</p>
        </AccordionHeader>
        <AccordionBody>
          <div className="overflow-auto max-h-52" style={{marginTop:'-22px'}}>
        { element.comment.map((element)=>{
                     return <> <div className="flex pr-4 mt-4 ml-1"> 
                      <img className="w-8 h-8 rounded-full ml-2" src={element?.profileImg? `http://localhost:8000/images/profile-images/${ element.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
                      <h1 className="font-medium text-justify " style={{marginLeft:'20px',marginTop:'-4px',}}>{element.user} 
                      <span className="font-normal ml-3 text-base">
                         {element.text}
                        </span>
                        </h1>
                        
                    </div>
                    <p className="text-xs font-normal" style={{marginLeft:'60px',width:'52px',marginTop:'-9px'}}>{format(element.timeStamp)}</p>
                    </>
                    })
                    
                    } 
                    </div>
        </AccordionBody>
      </Accordion>
      </Fragment>
            <div className="flex ml-20 " style={{marginLeft:'20rem'}}>
             <input className="border border-slate-300 mt- h-9 w-96 mr- bg-gray-50 pl-3" onChange={(e)=>{setComment(e.target.value)}} type="text" placeholder="Add comment" style={{marginLeft:"-20rem",width:"41rem"}}/>
             <p className="mt- ml-28 absolute text-sky-300 cursor-pointer" onClick={()=>{onComment(element._id)}} style={{marginLeft:'17rem'}} >Post</p>
            </div> 
           </div>
                       </>
        }) 
        }
       </div>
          <Suggestions />

    </div>
   { showModal? <Search setShowModal={setShowModal}/> : null}
   {notificationModal? <NotificationModal setNotificationModal={setNotificationModal} receiveNotif={receiveNotif}/> : null }
    </>
  )
}

export default homePage

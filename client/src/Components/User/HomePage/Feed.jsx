import React,{useEffect,useState,Fragment,useRef} from 'react'
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";
import {io} from "socket.io-client";
import Suggestions from "./Suggestions"
import NotificationModal from "../Notification";;
import Search from "./Search";
import axios from "axios";
import {format} from "timeago.js";
import {config} from "../../../Config/config";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";


function homePage() {
  const navigate = useNavigate()
  const [reason,setReason] = useState('')
  const [notifModal,setNotifModal] = useState(false)
  const [feedPosts,setFeedPosts] = useState([])
  const [comment,setComment] = useState('')
  const [showModal,setShowModal] = useState(false) 
  const [open, setOpen] = useState(1);
  const [userData,setUserData] = useState({})
  const [notificationModal,setNotificationModal] = useState(false) 
  const [receiveNotif,setReceiveNotif] = useState({})
  const socket = useRef()                   
  const [reportModal,setReportModal] = useState({modal:false,postId:''})
  let localUser = JSON.parse( localStorage.getItem('user') )

console.log(reportModal ,'555555');
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
    console.log(config,'oppopopopoopp');
    axios.get(`http://localhost:8000/getAllPosts/${localUser._id}`,config).then((res)=>{
      if (res.data.err) {
        navigate('/Error-500')
      }
      
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
    axios.post(`http://localhost:8000/post-like-Unlike`,{postId,likedUserId,postedUserId:postedUserId,homePage:true},config).then((res)=>{  
      if (res.data.err) {
        navigate('/Error-500')
      }   
    setFeedPosts(res.data.data)
       if(res.data.liked){
        socket.current.emit('sent-notification',{receiverId:postedUserId,notifData:{user:localUser.fname,date:new Date(),text:'liked your post'}})
       }
    })
  }
  const onComment = (postId,postedUserId)=>{
    if(!comment==""){
      axios.put('http://localhost:8000/add-comment',{comment:comment,user:localUser.fname,postId:postId,profileImg:userData.profileImg,
      commentedUserID:localUser._id,recieverId:postedUserId,date:new Date(),homePage:true},config)
      .then(async (res)=>{
        if (res.data.err) {
          navigate('/Error-500')
        }
          setFeedPosts(res.data.data)
          await socket.current.emit('sent-notification',{receiverId:postedUserId,notifData:{user:localUser.fname,date:new Date(),text:`commented on your post'${comment}'`}})

          
      })
    }
    else{
      console.log('err');
    }
  }
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handelOnReport = ()=>{
     axios.put('http://localhost:8000/report-post',{postId:reportModal.postId,reason:reason}).then((res)=>{
      setReportModal({modal:false,postId:''})       
     })
  }
  const onCommentDelete = (commentId)=>{
    axios.put('http://localhost:8000/delete-comment',{commentId:commentId},config).then((res)=>{
      location.reload()
     })
  }
   
  return (
    <>
    <Navbar  setShowModal={setShowModal} setNotificationModal={setNotificationModal} receiveNotif={receiveNotif}/>
     
    <div className="flex justify-between  overflow-auto pt-2"> 
     <div>
     
      <div className="w-60 h-60 ml-10 bg-gray-50 rounded-xl mt-11">
           {/* <h1>Active Users</h1>
           {
           <div className="flex ml-3 mt-2">
                  <img className="w-8 h-8 rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                   
                    <h1 className="ml-3 font-medium mt-1">hh</h1>
                    </div>
           } */}
      </div>
     </div>
     <div>
       { 
        feedPosts.map((element)=>{
       return <>
       <div className="feed">
      <div className="posts w-96 h-72 bg-gray-50 mx-auto pt-16 overflow-auto ">
       
        <div className="ml-1 ">
          <img className="w-9 h-9 rounded-full ml-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" style={{marginTop:'-47px'}}  />
            <h1 className="float-left ml-14 text-lg font-normal " style={{marginTop:'-35px'}}>{element.userName}</h1> 
           <h1 className="mr-64 text-sm font-light" style={{marginTop:'-33px',marginRight:'20rem'}}>{format(element.date)}</h1>
          
          <div>
           <Menu placement="right-start">
          <MenuHandler>
          <svg  style={{marginTop:'-39px',float:"right"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
          </MenuHandler>
          <MenuList>
            <MenuItem className="hover:bg-gray-200" onClick={()=>{setReportModal({modal:true,postId:element._id})}} >Report</MenuItem>
          </MenuList>
        </Menu>
       </div>
       
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
       
          <div className="border-2 border-black-600  bg-gray-50" style={{width:"40rem"}}>
            {/* <p className="float-left ml-4 text-gray-500 mt-2">View all {element.comment.length} comments</p> */}
           <Fragment>
      <Accordion open={open === 1} >
        <AccordionHeader onClick={() => handleOpen(1)} className="h-2 text-base font-normal">
        <p className="float-left ml-4 text-gray-500 mt-2">View all {element.comment.length} comments</p>
        </AccordionHeader>
        <AccordionBody>
          <div className=" overflow-auto max-h-52" style={{marginTop:'-22px'}}>
        { element.comment.map((element)=>{
                     return <> <div className="flex pr-4 mt-4 ml-1"> 
                      <img className="w-8 h-8 rounded-full ml-2" src={element?.profileImg? `http://localhost:8000/images/profile-images/${ element.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
                      <h1 className="font-medium text-justify " style={{marginLeft:'20px',marginTop:'-4px',}}>{element.user} 
                      <span className="font-normal ml-3 text-base">
                         {element.text}  
                        </span>
                        </h1>
                       { element.user == localUser.fname && <svg onClick={()=>{onCommentDelete(element._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 float-right ml-auto text-red-500 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>}
                    </div>
                    <p className="text-xs font-normal" style={{marginLeft:'45px',width:'',marginTop:'-9px',maxWidth:'93px'}}>{format(element.date)}</p>
                    </>
                    })
                    
                  } 
                    </div>
        </AccordionBody>
      </Accordion>
      </Fragment>
            <div className="flex ml-20 " style={{marginLeft:'20rem'}}>
             <input className="border border-slate-300 mt- h-9 w-96 mr- bg-gray-50 pl-3" onChange={(e)=>{setComment(e.target.value)}} type="text" placeholder="Add comment" style={{marginLeft:"-20rem",width:"41rem"}}/>
             <p className="mt- ml-28 absolute text-sky-300 cursor-pointer" onClick={()=>{onComment(element._id,element.userId)}} style={{marginLeft:'17rem'}} >Post</p>
            </div> 
           </div>
            </div>     
                  </>
        }) 
        }
       </div>
          <Suggestions />

    </div>
    {
      reportModal.modal? <>
      <div  className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}  
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-normal text-center ml-20 ">
                        Report Post
                      </h3>
                       <svg onClick={() =>{setReportModal(false)} } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    </div> 
                    {/*body*/}                
    
                    <div className="relative flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"22rem",height:'19rem'}}>
                    
                     <div className="flex ml-9 mt-3  cursor-pointer" >
                     <div class="flex justify-center">
  <div>
    <div class="form-check ">
      <input onClick={()=>{setReason('its spam')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
      <label class="form-check-label ml-5 inline-block text-gray-800 mr-32 tracking-wide" for="flexRadioDefault1">
      its spam
      </label>
    </div>
    <div class="form-check mt-3">
      <input  onClick={()=>{setReason('Nudity or sexual activity')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Nudity or sexual activity
      </label>
    </div>
    <div class="form-check mt-3">
      <input onClick={()=>{setReason('Bullying or harassment')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Bullying or harassment
      </label>
    </div>
    <div class="form-check mt-3">
      <input onClick={()=>{setReason('Hate speech or symbols')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Hate speech or symbols
      </label>
    </div>
    <div class="form-check mt-3">
      <input onClick={()=>{setReason('Suicide or self-injury')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label mr-6 inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Suicide or self-injury
      </label>
    </div>
    <div class="form-check mt-3">
      <input onClick={()=>{setReason('False information')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label mr-12 inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      False information
      </label>
    </div>
  </div>
</div>
                      </div>
                      <Button className="mt-8 " color="red" onClick={handelOnReport}>Report</Button>
                    </div>
                    {/*footer*/}
                    
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> 
            </>:null }
   { showModal? <Search setShowModal={setShowModal}/> : null}
   {notificationModal? <NotificationModal setNotificationModal={setNotificationModal} receiveNotif={receiveNotif}/> : null }

    </>
  )
}

export default homePage

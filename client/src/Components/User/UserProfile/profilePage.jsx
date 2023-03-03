import {useContext,useState,useEffect,useRef} from 'react'
import {AuthContext} from "../../../Store/Context";
import axios from "axios";
import Navbar from "../Navbar";
import ViewPost from "./ViewPost"; 
import ReportModal from "./ReportModal"; 
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import {io} from "socket.io-client";
import {config} from "../../../Config/config";

function profilePage() {
  const [userData,setUserData] = useState({})
  const [posts,setPosts] = useState([])
  const [followingModal,setFollowingModal] = useState(false)
  const [followersModal,setFollowersModal] = useState(false)
  const [followersCount,setFollowersCount] = useState(null)
  const [followingCount,setFollowingCount] = useState(null)
  const [viewPost,setViewPost] = useState(false)
  const [viewPostedData,setViewPostedData] = useState({})
  const [followings,setFollowings] = useState(false)
  const [following,setFollowing] = useState([])
  const [followers,setFollowers] = useState([])
  const [reportModal,setReportModal] = useState(false)

  let searchedUser = JSON.parse( localStorage.getItem('searchedUser') )
  let user = JSON.parse( localStorage.getItem('user') )
  
  const socket = useRef()    
  console.log(followings,';*/*/*');     

  useEffect(()=>{
    socket.current = io('http://localhost:8800')   
    socket.current.emit('new-user-add', user._id)
    
  },[])   

  useEffect(()=>{  
    
   console.log('kkkkk');   
          setUserData(searchedUser)
    axios.get(`http://localhost:8000/profile-datas/${searchedUser._id}`,config).then((res)=>{
      if (res.data.err) {
        navigate('/Error-500')
      }
      setPosts(res.data.data)
      setFollowersCount(res.data.followers)
      setFollowingCount(res.data.following)
    
    })
  },[])

  useEffect( ()=>{
    axios.get(`http://localhost:8000/getFollowing-Followers/${searchedUser._id}`,config).then((res)=>{
      if (res.data.err) {
        navigate('/Error-500')
      }
      console.log('xsxsxsxsx',res.data.followingUsers);
      res.data.followersUsers.map((element)=>{
        if(element.id == searchedUser._id){
                setFollowings(true)
        }
      
      })
        setFollowing(res.data.followingUsers)
        setFollowers(res.data.followersUsers)
   })
       
 },[]) 

 const onUnFollow = ()=>{
  axios.put('http://localhost:8000/unFollow',{id:searchedUser._id,userId:user._id},config).then(()=>{
    if (res.data.err) {
      navigate('/Error-500')
    }
    setFollowings(null)
    location.reload()
  })
 }

 function onFollow() {
  axios.post('http://localhost:8000/follow',{followedUserId:searchedUser._id,userId:user._id},config).then((res)=>{
    if (res.data.err) {
      navigate('/Error-500')
    }  
  location.reload() 
  })
} 
  return (
    <>
    <Navbar />
        
    <div className="container">
        <div className="flex mt-10">
          <div class="">
         { userData?.profileImg?
          <img src={`http://localhost:8000/images/profile-images/${ userData.profileImg }`} onClick={()=>{setProfileImgModal(true)}} className="rounded-full ml-96 h-46  cursor-pointer" alt="" style={{width:'18rem',height:'17rem'}}/> 
          : 
          <img className="rounded-full ml-96 h-46 w-20 cursor-pointer" onClick={()=>{setProfileImgModal(true)}} style={{width:'18rem',height:'17rem'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
        } 
         </div>
           <div className="">
             <div className="flex mt-16 ml-32 w-40 pr-16">
              <h1 className="  text-4xl font-light">{userData.fname}</h1>
              <div className="ml-11 mt-1">
                {
                  followings == true?
                     <button onClick={onUnFollow} className="bg-indigo-400 hover:bg-indigo-600 bg-slate-300 text-black  hover:bg-gray-500 rounded-md w-28 h-8 text-white border border-slate-900 font-medium">Following</button>
                     :
                     <button onClick={onFollow} className="bg-indigo-400 hover:bg-indigo-600 rounded-md w-28 h-8 text-white border  font-medium">Follow</button>

                // followings.map((element)=>{
                //   return element.id == searchedUser._id ?
                // <button onClick={onUnFollow} className="bg-indigo-400 hover:bg-indigo-600 rounded-md w-28 h-8 text-white border border-slate-900 font-medium">UnFollow</button>
                // :
                // <button onClick={()=>{navigate('/edit-profile')}} className="bg-indigo-400 hover:bg-indigo-600 rounded-md w-28 h-8 text-white border border-slate-900 font-medium">Follow</button>
                // })
                
                }
                </div>
                <div className="mt-9 ml-8">
                <Menu placement="right-start">
          <MenuHandler>
          <svg onClick={()=>{setReportModal(true)}} style={{marginTop:'-33px',float:"right"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
          </MenuHandler>
          <MenuList>
            <MenuItem className="hover:bg-gray-200" onClick={()=>{setReportModal(true)}} >Report</MenuItem>
          </MenuList>
        </Menu>
                 {/* <svg onClick={()=>{setReportModal(true)}} style={{marginTop:'-33px',float:"right"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mr-3 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg> */}
              </div>  
          </div>
            <div className="flex ml-32 mt-6">
                <h1 className="text-lg font-normal"><span className="font-medium">{posts.length}</span> posts</h1> 
                <h1 className="text-lg ml-12 font-normal cursor-pointer" onClick={()=>{ setFollowersModal(true)}}><span className="font-medium">{followersCount}</span> followers</h1>
                <h1 className="text-lg ml-12 font-normal cursor-pointer" onClick={()=>{ setFollowingModal(true)}}><span className="font-medium">{followingCount}</span> following</h1>

              </div>
              <div className="ml-32 mt-6">
                <h1 className="float-left text-lg">{userData?.bio}</h1>
              </div>
              
              
           </div>
          
         </div> 
       
         <div className="mt-28">
            <div className='px-28 '>
            <hr class="h-0.5 bg-gray-700 "/>
              </div>
              <div className="flex justify-between">
                <div>
                </div>
                <div className="flex ml-36">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                 </svg>
              <p className="mt-0.5 font-medium  text-sm">POSTS</p>
                </div>
              <div className="flex justify-end mr-36 mt-1 " > 
 
               
                </div>
              </div>
              <div className="grid mt-3 grid-cols-3 gap-y-8 ml-12  px-36 ">
              { posts.map((element)=>{
                
               return  <>
               <div>
                <img onClick={()=>{setViewPost(true) 
                                  setViewPostedData(element)
               }} className="post-profile-image hover:brightness-50 cursor-pointer" src={`http://localhost:8000/images/${ element.image }`}  alt="" /> 
               <button className="post-view absolute border text-white ">sasas</button>
               </div>
               </>
               
          })
              }
              </div>
         </div>
    </div>
    {followersModal ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal text-center ml-36 ">
                    Followers
                  </h3>
                  <svg onClick={() => setFollowersModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt- rounded-lg overflow-auto" style={{width:"27rem",height:'20rem'}}>
                  { followers.map((element)=>{
                   return element.user ?  <div className="flex justify-between mt-2 ">
                    
                    <div className="flex">
                  <img className="w-10 h-10 rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                   
                    <h1 className="ml-3 font-medium mt-1">{element.user}</h1>
                    </div>
                    <div className="border border-zinc-400 h-7 w-24 rounded-lg mt-1 cursor-pointer">
                      Follow
                    </div>
                  </div>  : null
                  })
                  }


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-16">
                   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
       {followingModal ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal text-center ml-36 ">
                    Following
                  </h3>
                  <svg onClick={() => setFollowingModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"27rem",height:'20rem'}}>
                  { following.map((element)=>{
                   return element.user ?  <div className="flex justify-between mt-3">
                    
                    <div className="flex">
                  <img className="w-10 h-10 rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                   
                    <h1 className="ml-3 font-medium mt-1">{element.user}</h1>
                    </div>
                    <div onClick={()=>{handleUnFollow(element.id)}} className="border border-zinc-400 h-7 w-24 rounded-lg mt-1 cursor-pointer">
                      UnFollow
                    </div>
                  </div>  : null
                  })
                   
                  }


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-16">
                      
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    {reportModal? <ReportModal setReportModal={setReportModal} userId={userData._id}/> : null}
    {viewPost ? <ViewPost setViewPost={setViewPost} viewPostedData={viewPostedData} userData={userData} 
    setViewPostedData={setViewPostedData} socket={socket}/> : null}
    </>
  )
}

export default profilePage

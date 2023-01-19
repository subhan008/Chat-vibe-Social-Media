import {useContext,useState,useEffect,useRef} from 'react'
import {AuthContext} from "../../../Store/Context";
import axios from "axios";
import Navbar from "../Navbar";
import ViewPost from "./ViewPost"; 
import {io} from "socket.io-client";

function profilePage() {
  const [userData,setUserData] = useState({})
  const [posts,setPosts] = useState([])
  const [followersCount,setFollowersCount] = useState(null)
  const [followingCount,setFollowingCount] = useState(null)
  const [viewPost,setViewPost] = useState(false)
  const [viewPostedData,setViewPostedData] = useState({})
  const [followings,setFollowings] = useState(null)
  const [followers,setFollowers] = useState([])

  let searchedUser = JSON.parse( localStorage.getItem('searchedUser') )
  let user = JSON.parse( localStorage.getItem('user') )
  
  const socket = useRef()    
  console.log(user,';*/*/*');     

  useEffect(()=>{
    socket.current = io('http://localhost:8800')   
    socket.current.emit('new-user-add', user._id)
    
  },[])   

  useEffect(()=>{  
    
   console.log('kkkkk');   
          setUserData(searchedUser)
    axios.get(`http://localhost:8000/profile-datas/${searchedUser._id}`).then((res)=>{   
      setPosts(res.data.data)
      setFollowersCount(res.data.followers)
      setFollowingCount(res.data.following)
    
    })
  },[])

  useEffect( ()=>{
    axios.get(`http://localhost:8000/getFollowing-Followers/${user._id}`).then((res)=>{
      res.data.followingUsers.map((element)=>{
        if(element.id == searchedUser._id){
                    setFollowings(true)
        }
      
      })
        // setFollowings(res.data.followingUsers)
        // setFollowers(res.data.followersUsers)
   })
       
 },[]) 

 const onUnFollow = ()=>{
  axios.put('http://localhost:8000/unFollow',{id:searchedUser._id,userId:user._id}).then(()=>{
    setFollowings(null)
    location.reload()
  })
 }

 function onFollow() {
  axios.post('http://localhost:8000/follow',{followedUserId:searchedUser._id,userId:user._id}).then((res)=>{
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

    {viewPost ? <ViewPost setViewPost={setViewPost} viewPostedData={viewPostedData} userData={userData} 
    setViewPostedData={setViewPostedData} socket={socket}/> : null}
    </>
  )
}

export default profilePage

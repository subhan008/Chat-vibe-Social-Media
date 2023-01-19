import React,{useState,useEffect} from 'react'
import Navbar from "../Navbar";
import axios from "axios";
import ProfileImgModal from "./ProfileImgModal";
import {useNavigate} from "react-router-dom";

function Profile() {      

const [showModal, setShowModal] = useState(false);
const [image,setImage] = useState() 
const [posts,setPosts] = useState([])
const [postView,setPostView] = useState(false)
const [caption,setCaption] = useState("") 
const [viewPostedData,setViewPostedData] =useState({})
const [comment,setComment] = useState("") 
const [followersCount,setFollowersCount] = useState("") 
const [followingCount,setFollowingCount] = useState("") 
const [followingModal,setFollowingModal] = useState(false)
const [followersModal,setFollowersModal] = useState(false)
const [following,setFollowing] = useState([])
const [followers,setFollowers] = useState([])
const [fileErrMsg,setFileErrMsg] = useState(false)
const [profileImgModal,setProfileImgModal] = useState(false)
const [userData,setUserData] =useState({})
const navigate = useNavigate()

console.log(profileImgModal,'uuuuu');
let localUser = JSON.parse( localStorage.getItem('user') )
const userId = localUser._id 

useEffect(()=>{
  axios.get(`http://localhost:8000/profile-datas/${userId}`).then((res)=>{
  setPosts(res.data.data)
  setFollowersCount(res.data.followers)
  setFollowingCount(res.data.following)
  setUserData(res.data.user)
})
},[])

useEffect(()=>{
  return ()=>{}
},[viewPostedData])

   useEffect( ()=>{
   axios.get(`http://localhost:8000/getFollowing-Followers/${userId}`).then((res)=>{
       setFollowing(res.data.followingUsers)
     
       setFollowers(res.data.followersUsers)
  })
      
},[]) 

  
const handleOnChange = (e)=>{
  setImage(e.target.files[0]) 
}

const onLike = (likedUserId,postId)=>{
  console.log('sasasas');
  axios.post(`http://localhost:8000/post-like-Unlike`,{postId,userId,profilePage:true}).then((result)=>{  
      setViewPostedData(result.data.data)
  })
}

const onSubmit = (e)=>{
  e.preventDefault();
if(image.type == "image/png"){
  const data = new FormData()
  
data.append('file',image);
const date = new Date() 
const userId = localUser._id
   console.log(data,'oooo');  
  axios.post('http://localhost:8000/upload-post',data,{params:{date,userId,caption}}).then((res)=>{
    location.reload() 
  })
}else{
  setFileErrMsg(true)
}} 

const onComment = (postId)=>{
  if(!comment==""){
    axios.put('http://localhost:8000/add-comment',{comment:comment,user:userData.fname,postId:postId,profileImg:userData.profileImg,date:new Date(),profilePage:true})
    .then((res)=>{
        setViewPostedData(res.data.data)
    })
  }
  else{
    console.log('err');
  }
}

const handleUnFollow = (id)=>{
  axios.put('http://localhost:8000/unFollow',{id:id,userId:userId}).then(()=>{
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
              <div className="ml-28 mt-1">
                <button onClick={()=>{navigate('/edit-profile')}} className="bg-indigo-500 hover:bg-indigo-700 rounded-md w-28 h-8 text-white border border-slate-900 font-medium">Edit profile</button>
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
 
                 <h2 className=" font-medium text-blue-600/100 cursor-pointer">Share Posts </h2>
                     <svg href="" onClick={()=>setShowModal(true) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="grid mt-3 grid-cols-3 gap-y-8 ml-12  px-36 ">
              { posts.map((element)=>{
                
               return  <><div><img onClick={()=>{setPostView(true) 
                                          setViewPostedData(element)
               }} className="post-profile-image hover:brightness-50 cursor-pointer" src={`http://localhost:8000/images/${ element.image }`}  alt="" /> 
               <button className="post-view absolute border text-white ">sasas</button>
               </div>
               </>
               
          })
              }
              </div>
         </div>
         {showModal ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal text-center ">
                    Create New Post
                  </h3>
                  <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt- rounded-lg" style={{width:"30rem",height:'33rem'}}>
                { fileErrMsg?
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                   <span class="block sm:inline">You can upload image file only</span>    
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg onClick={()=>{setFileErrMsg(false)}} class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>: null
                }
               { image? 
               <>  <img className=" px-5 ml-1"  src={URL.createObjectURL(image)} alt="" style={{maxWidth:"100%",height:'auto'}}/>
                <button class="bg-black mt-4 rounded-xl hover:bg-indigo-dark text-white font-bold py-2 px-4 w-54 inline-flex justify-center">
                  <span>Change Image</span> 
                  <input onChange={handleOnChange} class="cursor-pointer absolute block opacity-0" type="file" name="file" multiple/>  
                </button>                 
              </>
                : 
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                   </svg>
                  <p className="my-4 text-slate-500 text-lg font-normal leading-relaxed mt-3">
                  Drag Your Photos and Videos Here
                  </p> 
                  <div class="relative w-64 mx-auto mt-10 mb-4">
  <button class="bg-black rounded-xl hover:bg-indigo-dark text-white font-bold py-4 px-4 w-full inline-flex justify-center">
    <span>Click to upload </span> 
    <input onChange={handleOnChange} class="cursor-pointer absolute block opacity-0" type="file" name="file" multiple/>  
  </button>   
</div>        
                  </> }
              
                  {/* <button className="bg-red-200 ">
                <input required name="image" onChange={handleOnChange} class="hidden block w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>       
</button> */}
<textarea onChange={(e)=>{setCaption(e.target.value)}} name="caption"  id="message" rows="4" class="mt-5 block p-2.5 w-full h-24 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Caption..."></textarea>
                    { image?<button onClick={onSubmit}
                    className="bg-blue-500 mt-3 h-10 w-40 pb-0 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" >
                    Share
                  </button> : null
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

       {postView ? (
        <>
          <div
            className="justify-center mr-24 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          style={{marginRight:"16rem"}}>

            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              style={{width:"67rem",height:'36rem'}}>
                {/*header*/}
                <div className="flex items-start justify-between px-5 border-b border-solid border-slate-200 rounded-t ">
                 <div></div>
                  <svg onClick={() => {setPostView(false)
                                     location.reload() }
                  } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100 mr-10 w-8 h-8 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
                </div>
                {/*body*/}
                <div className="flex ">
                      
                   <img src={`http://localhost:8000/images/${viewPostedData.image}`}  alt="" className="w-6/12 bg-red-100" style={{maxWidth:"100%",height:'34rem'}}/>
                   <div className="w-6/12  bg-white-100">
                    <div className="border border-gray-300 flex w-11/12 h-12">
                      <img className="w-9 h-9 rounded-full ml-2"  src={userData?.profileImg? `http://localhost:8000/images/profile-images/${ userData.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"}  alt="" />
                   <h1 className="font-medium text-lg" style={{marginLeft:'20px',marginTop:'5px'}}>{localUser.fname}</h1> 
                   </div>
                  <div className="border border-gray-300 w-11/12 overflow-auto" style={{height:'350px'}}>
                    <div className="flex pr-4 mt-3">
                      <img className="w-9 h-9 rounded-full ml-2 " src={userData?.profileImg? `http://localhost:8000/images/profile-images/${ userData.profileImg }` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
                      <h1 className="font-medium text-justify text-lg " style={{marginLeft:'20px',marginTop:'5px'}}>{localUser.fname} 
                      <span className="font-normal ml-3 text-base">
                         {viewPostedData.caption}
                        </span>
                        </h1>
                    </div>
                    <div className="mt-7 ml-2">
                    { viewPostedData.comment.map((element)=>{
                     return <div className="flex pr-4 mt-4 ml-1"> 
                      <img className="w-8 h-8 rounded-full ml-2" src={element?.profileImg? `http://localhost:8000/images/profile-images/${ element.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
                      <h1 className="font-medium text-justify " style={{marginLeft:'20px',marginTop:'3px'}}>{element.user} 
                      <span className="font-normal ml-3 text-base">
                         {element.text}
                        </span>
                        </h1>
                    </div>
                    })
                    
                    } 
                    </div>
                  </div>
                    <div className="border border-gray-300 w-11/12 h-24">
                      <div className="flex ml-4 mt-1">
                       { viewPostedData.likedUsers.includes(localUser._id) ? <svg className="w-8 h-8 cursor-pointer fill-red-500 text-red-500" onClick={()=>{
                        onLike(userId,viewPostedData._id)    
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                         </svg>
                         : 
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>{
                          
                          onLike(userId,viewPostedData._id)     
                         }} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                       }
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" ml-5 w-8 h-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        
                      </div>
{                      <p  className="font-semibold text-base float-left ml-4 mt-3 ">{viewPostedData.like} Likes</p>
}                    </div>
                    <input className=" text-gray-400 float-left ml-4 mt-3 h-8 w-96" onChange={(e)=>{setComment(e.target.value)}} placeholder="Add comment" type="text" />
                  
                    <a onClick={()=>{onComment(viewPostedData._id)}} className="float-right mr-16 mt-3 text-sky-300 cursor-pointer" >Post</a>
                    </div>                                          
                </div>
                {/*footer*/}
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
      {
        profileImgModal? <ProfileImgModal user={userData} setProfileImgModal={setProfileImgModal}/>:null
      }
    </div>
    </>
  )
}

export default Profile

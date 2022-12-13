import React,{useEffect,useState} from 'react'
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";
import Suggestions from "./Suggestions";
import axios from "axios";

function homePage() {
  const navigate = useNavigate()
  const localUser = JSON.parse( localStorage.getItem('user'))
  const [searchInput,setSearchInput] = useState('')
  const [notifModal,setNotifModal] = useState(false)
  const [feedPosts,setFeedPosts] = useState([])
  const [comment,setComment] = useState('')

console.log(feedPosts ,'555555');
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
    
  const handleOnChange = (e)=>{
    setSearchInput(e.target.value)
  }   
  useEffect(()=>{
    axios.get(`http://localhost:8000/getAllPosts`).then((res)=>{
      setFeedPosts(res.data.posts)
    })
  },[])

  const onLikeUnlike = (userId,postId)=>{
    console.log('44444444444');
    axios.post(`http://localhost:8000/post-like-Unlike`,{postId,userId,homePage:true}).then((res)=>{  
       setFeedPosts(res.data.data)
    })
  }
  const onComment = (postId)=>{
    if(!comment==""){
      axios.put('http://localhost:8000/add-comment',{comment:comment,user:localUser.fname,postId:postId,homePage:true})
      .then((res)=>{
          setFeedPosts(res.data.data)
          
      })
    }
    else{
      console.log('err');
    }
  }
  return (
    <>
    <Navbar />
     
    <div className="flex justify-between mt-5 overflow-auto "> 
     <div>
      <div className="w-64 h-32 ml-10 bg-gray-50 rounded-xl">
        <h1 className="text-3xl mr-36 mt-5">Search</h1>
      <div className="flex pt-4 ml-2"> 
      <form action="">
         <input  className="w-48 h-10 border-2 border-stone-400 rounded-l-lg   " onChange={handleOnChange} placeholder="Add comment" type="text"/>
         </form>
         <button className="w-11 h-10 bg-blue-400 rounded-r-lg">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 text-white">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
         </svg>
        </button>
                
        </div>
      </div>
      <div className="w-60 h-60 ml-10 bg-gray-50 rounded-xl mt-11">

      </div>
     </div>
     <div>
       { 
        feedPosts.map((element)=>{
       return <>
        <div className="posts w-96 h-72 bg-gray-50 mx-auto pt-16 overflow-auto">
        
        <div className="ml-1">
          <img className="w-9 h-9 rounded-full ml-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" style={{marginTop:'-47px'}}  />
          <h1 className="float-left ml-14 text-lg font-normal  " style={{marginTop:'-33px'}}>{element.userId}</h1>
        </div>
        <img className="post-img  bg-blue-200 mt-3" src={`http://localhost:8000/images/${ element.image }`} alt="" />
        <div className="flex mt-3 ml-3">
        { element.likedUsers.includes(localUser._id)?
                      <svg onClick={()=>{ onLikeUnlike(localUser._id,element._id) }} className="w-8 h-8 cursor-pointer fill-red-500 text-red-500"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                         </svg>
                         :
                         <svg onClick={()=>{ onLikeUnlike(localUser._id,element._id) }} xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
        } 
                         
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" ml-4  w-8 h-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg> 
                    </div>
                      <p  className="font-semibold text-base float-left ml-4 mt-3 ">{element.like} Likes</p>
                      <div className="flex mt-10 ml-4 ">  
                        <h1 className="font-medium text-justify ">{element.userId}<span className="ml-1 font-normal text-slate-600 ">
                          {element.caption}
                          </span></h1>
                       
                      </div>
                        
         </div>
       
          <div className="border-2 border-black-600 h-20 bg-gray-50" style={{width:"40rem"}}>
            <p className="float-left ml-4 text-gray-500 mt-2">View all {element.comment.length} comments</p>
          
            <div className="flex ml-20 " style={{marginLeft:'20rem'}}>
             <input className="border border-slate-300 mt-10 h-9 w-96 mr- bg-gray-50 pl-3" onChange={(e)=>{setComment(e.target.value)}} type="text" placeholder="Add comment" style={{marginLeft:"-20rem",width:"40rem"}}/>
             <p className="mt-11 ml-28 absolute text-sky-300 cursor-pointer" onClick={()=>{onComment(element._id)}} style={{marginLeft:'17rem'}} >Post</p>
            </div> 
           </div>
                       </>
        }) 
        }
       </div>
          <Suggestions />

    </div>
    
    </>
  )
}

export default homePage

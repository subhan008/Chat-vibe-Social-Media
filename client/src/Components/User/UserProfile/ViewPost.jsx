import {useEffect,useState} from 'react'
import axios from "axios";

function VIewPost({setViewPost,viewPostedData,userData,setViewPostedData,socket}) {

const [comment,setComment] = useState("") 
let localUser = JSON.parse( localStorage.getItem('user') )


  useEffect(()=>{
    return ()=>{}
  },[viewPostedData])
  
  const onLikeUnlike = (likedUserId,postId,postedUserId)=>{
    console.log('44444444444'); 
    axios.post(`http://localhost:8000/post-like-Unlike`,{postId,likedUserId,postedUserId:postedUserId,searchPage:true}).then((res)=>{  
      setViewPostedData(res.data.data)
       if(res.data.liked){
        socket.current.emit('sent-notification',{receiverId:postedUserId,notifData:{user:localUser.fname,date:new Date(),text:'liked your post'}})  
       }
    })
  }

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
  return (
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
                  <svg onClick={() => {setViewPost(false) }
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
                   <h1 className="font-medium text-lg" style={{marginLeft:'20px',marginTop:'5px'}}>{userData.fname}</h1> 
                   </div>
                  <div className="border border-gray-300 w-11/12 overflow-auto" style={{height:'350px'}}>
                    <div className="flex pr-4 mt-3">
                      <img className="w-9 h-9 rounded-full ml-2 " src={userData?.profileImg? `http://localhost:8000/images/profile-images/${ userData.profileImg }` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
                      <h1 className="font-medium text-justify text-lg " style={{marginLeft:'20px',marginTop:'5px'}}>{userData.fname} 
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
                        onLikeUnlike(localUser._id,viewPostedData._id,viewPostedData.userId)    
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                         </svg>
                         : 
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>{
                          
                         onLikeUnlike(localUser._id,viewPostedData._id,viewPostedData.userId)    
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
  )
}

export default VIewPost

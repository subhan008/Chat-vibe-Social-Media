import {useEffect,useState} from 'react'
import axios from "axios";

function followingsModal({setShowModal,userId,setChatUsers,setChatUser,chatUsers,setMessages}) {

const [followings,setFollowings] = useState([])

console.log(chatUsers,'helooo');

    useEffect(()=>{
         axios.get(`http://localhost:8000/getFollowing-Followers/${userId}`).then((res)=>{
         setFollowings(res.data.followingUsers)
        })  
    },[])
    
    const handleOnAdd = (obj)=>{

         axios.post('http://localhost:8000/add-newMessage',{messagerId:userId,receiverId:obj.id}).then((res)=>{
            setChatUsers([...chatUsers,obj]) 
            setMessages(res.data.chatUser.chat)
            setShowModal(false)
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
                  <h3 className="text-2xl font-normal text-center ml-28 ">
                    New Message
                  </h3>
                  <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"27rem",height:'20rem'}}>
                { followings.map((element)=>{
                   return element.user ?  <div className="flex justify-between mt-3 hover:bg-slate-100">
                    
                    <div className="flex">
                  <img className="w-10 h-10 rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                   
                    <h1 className="ml-3 font-medium mt-1">{element.user}</h1>
                    </div>
                    <div onClick={()=>{handleOnAdd(element)}} className="border bg-blue-500 cursor-pointer hover:bg-blue-400 text-white border-zinc-400 h-7 w-16 rounded-lg mt-1">
                      Add
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
      
   
  )
}

export default followingsModal

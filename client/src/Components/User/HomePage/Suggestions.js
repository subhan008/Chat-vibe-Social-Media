import React,{useState,useEffect} from 'react'
import axios   from "axios";
function Suggestions({}) {

const [users,setUsers] = useState([])
const localUser = JSON.parse( localStorage.getItem('user'))

console.log(users,'okokoo');

 useEffect(()=>{
  axios.get(`http://localhost:8000/suggestions/${localUser._id}`).then((res)=>{
    setUsers(res.data.data)
  })
 },[])
 
function onFollow(followedUserId,userId) {
  console.log(users,'okokoo');
  axios.post('http://localhost:8000/follow',{followedUserId:followedUserId,userId:localUser._id}).then((res)=>{
    
  })
} 

  return (
    <div className=" h-80 mr-5 bg-white rounded-xl overflow-auto scrollbar-hide mt-6" style={{width:"25rem"}}>
     <h1 className="font-medium text-gray-500">Suggestions for u</h1>
     { users.map((element)=>{
       return <div className="flex mt-5  ">
        <img className="w-8 h-8 rounded-full ml-2" src={element?.profileImg? `http://localhost:8000/images/profile-images/${ element.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"} alt="" />
        <div className='flex justify-between w-96'>
         <h1 className="ml-3 font-normal">{element.fname}</h1>    
           <h1 onClick={()=>{element.follow = true
          onFollow(element._id) }} className="mr-3 text-blue-500 font-medium">follow</h1> 
       </div>
      </div>
      
     })
     
}
    </div>
  )
}

export default Suggestions

import {useState,useEffect} from 'react'
import Navbar from "../Navbar";
import axios from "axios";
function EditProfile() {    
 
  const [userData,setUserData] = useState({})

 let localUser = JSON.parse( localStorage.getItem('user') )

const [formData,setFormData]  = useState({}) 
const [showModal,setShowModal] = useState(false)

useEffect(()=>{
  axios.get(`http://localhost:8000/profile-datas/${localUser._id}`).then((res)=>{
    setFormData(res.data.user)
  })
},[]) 
   
console.log(formData,'88888');    

const handleOnSubmit = ()=>{
   axios.put('http://localhost:8000/edit-profile',formData)
}

const handleOnchange = (e)=>{
   setFormData({...formData,[e.target.name]:e.target.value})
}         

const handleChangePassword = ()=>{
  
}
  return (
    <>
    <Navbar />
 <div className="flex justify-center">
    <div className="bg-white  mt-5 w-60  pl-16" style={{width:'44rem',height: '35rem'}}>
        
        <div className=" mr-16 h-14 bg-indigo-50  border-2 border-slate-500" style={{width:'44rem',marginLeft:'-64px'}}>
           <h1 className="float-left ml-10 text-2xl mt-2 font-medium">Edit Profile</h1> 
        </div>
        <button onClick={()=>{setShowModal(true)}} className="bg-slate-200 font-medium w-40 hover:bg-sky-100 h-8 mt-9 float-right mr-4 rounded-lg border-2 border-lime-700">change password</button>
        <div class="flex w-full px-3 mb-6 md:mb-0 mt-3 ml-14">
        <img className="w-9 h-9 rounded-full  "  src={userData?.profileImg? `http://localhost:8000/images/profile-images/${ userData.profileImg }` :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"}  alt="" />
                   <h1 className="font-medium text-lg" style={{marginLeft:'35px',marginTop:'5px'}}>{formData.fname}</h1> 
       </div>
    <form class="w-full max-w-lg mt-9">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="flex w-full px-3 mb-6 md:mb-0">
      
      <h1 className="flex mt-3 ml-5 text-lg"><span >User</span> <span className='ml-1'>name</span> </h1>
      
      <input name="fname" value={formData.fname}  onChange={handleOnchange} class="appearance-none ml-9 block w-96 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="User name"/>
    </div>
  
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="flex w-full px-3 mb-6 md:mb-0 ml-8">
      
      <h1 className="flex mt-3 ml-5 text-lg">Email</h1>
      
      <input  value={formData.email} name="email" onChange={handleOnchange} class="appearance-none ml-11 block w-96 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="User name"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="flex w-full px-3 mb-6 md:mb-0 ml-8">
      
      <h1 className="flex mt-3 ml-5 text-lg">Bio</h1>
      <textarea value={formData?.bio} name="bio" onChange={handleOnchange} id="message" rows="4" class="appearance-none ml-16 block w-96 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Write your bio here..."></textarea>
    </div>
  </div>
  <div className="flex justify-center ml-16 mt-6">
    <button onClick={handleOnSubmit} className="shadow bg-purple-500 w-40 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
  </div>
</form>
    </div>
    
    </div>
    {showModal?<>
      <div
      className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}  
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-normal text-center ml-28 ">
              Change Password
            </h3>
            <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100 cursor-pointer w-8 h-8 ">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
          </div>
          {/*body*/}                

          <div className="relative p-6 flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"27rem",height:'27rem'}}>
           <div className="mt-3">
            <div>
               <label htmlFor="" className="float-left ml-6 text-lg">Old password</label>
               <input type="password"  className="w-96 h-10 border-2 border-stone-400 rounded-full py-2 px-4 mt-1" placeholder=""/>
            </div>
            <div className="mt-6">
              <label htmlFor="" className="float-left ml-6 text-lg">New passowrd</label>
              <input type="passowrd"  className="w-96 h-10 border-2 border-stone-400 rounded-full py-2 px-4 mt-1" placeholder=""/>
            </div>
            <div className="mt-6">
              <label htmlFor="" className="float-left ml-5 text-lg">Confirm new passowrd</label>
              <input type="passowrd"  className="w-96 h-10 border-2 border-stone-400 rounded-full py-2 px-4 mt-1" placeholder=""/>
            </div>
           </div>
           <div className="mt-11">
             <button onClick={handleOnSubmit} className="shadow bg-purple-500 w-40 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>

          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b ">
             
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>   
    </>      :
    null 
    }
    </>
  )
}

export default EditProfile

import {useState,useEffect} from 'react'
import SideNavbar from "./SideNavbar";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import {config} from "../../Config/adminConfig";

function Rposts() {

const [posts,setPosts] = useState([])
const [modal,setModal] = useState(false)
const [reasons,setReasons] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/admin/reported-posts",config).then((res)=>{
          if (res.data.err) {
            navigate('/Error-500')
          }
            setPosts(res.data.posts)
        })
    },[])
    
    console.log(posts,'bvbvbv');

  const post_delete = (postId)=>{
          if (confirm("are you sure")) {
            axios.put("http://localhost:8000/admin/delete-post",{postId:postId},config).then((res)=>{
              if (res.data.err) {
                navigate('/Error-500')
              }
            })
          }else {}
    }   
  const handleOnClick = (reasons)=>{
   
   const x = [...new Set(reasons)]  
   setReasons(x) 
   setModal(true)
  }  
  return (
    <>
    <SideNavbar/>
    <div class="overflow-hidden rounded-lg px-20 " style={{marginLeft:'19rem'}}>
  <table class="w-full  border-collapse bg-white text-left text-sm text-gray-500 mt-20">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">USER</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">ID</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">REPORTS</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">BLOCK</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      { posts.map((element)=>{
        return <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="relative h-10 w-10">
            <img
              class="h-full w-full rounded-full object-cover object-center"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU"
              alt=""
            />
          </div>
          <div class="text-sm">
            <div class="font-medium text-gray-700">{element.userName}</div>
            <div class="text-gray-400">{element.email}</div>
          </div>   
        </th>
        
        <td class="px-6 py-4">{element._id}</td>
        <td class="px-6 py-4">
            <div className="flex">
                <span
            class="inline-flex  items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-sm font-semibold text-green-600"
          >
            {element.reportCount}
          </span>
           <h1 className="ml-4 cursor-pointer text-blue-600 mt-1" onClick={()=>{handleOnClick(element.reportReasons)}}>See the Reasons</h1>
            </div>
          
        </td>
        <td class="">
            <Button color="red" onClick={()=>{post_delete(element._id)}}>Delete</Button> 
        </td>
        
      </tr>
      })
            }

    </tbody>
  </table>
</div>
{  modal?
     <>
     <div  className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
             <div className="relative w-auto my-6 mx-auto max-w-3xl">
               {/*content*/}  
               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                 {/*header*/}
                 <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                   <h3 className="text-2xl font-normal text-center ml-20 ">
                     Report Reasons
                   </h3>
                    <svg onClick={() =>{setModal(false)} } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </div> 
                 {/*body*/}                
 
                 <div className="relative flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"22rem",height:'14rem'}}>
                 
                  <div className="flex ml-9 mt-3  cursor-pointer" >
                  <div class="flex justify-center">
<div>
 {  reasons.map((element)=>{
   return <div class="form-check w-60 text-left text-xl mt-2">
   <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault1">
   * {element}
   </label>
   </div>
 })

}
</div>
</div>
                   </div>
                 </div>
                 {/*footer*/}
                 
               </div>
             </div>
           </div>
           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>  
           </> :null
}
    </>
  )
}

export default Rposts

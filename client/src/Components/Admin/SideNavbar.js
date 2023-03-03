import React from 'react'
import {useNavigate} from "react-router-dom";

function SideNavbar() {

 const navigate = useNavigate()
 const handleLogout = ()=>{

    localStorage.removeItem('admin')
    localStorage.removeItem('adminToken')
  
    navigate('/admin/login')
   
 }
  return (
    <div class="w-64 h-full shadow-md bg-white px-1 absolute">
        <div>
        <h2 className="text-3xl font-semibold mt-16 cursor-pointer" onClick={()=>{navigate('/')}}>Chat <span className="text-fuchsia-800 mr-5">vibe</span></h2>

        </div>
  <ul class="relative mt-8">
    <li class="relative h-16">
        <div className="flex hover:bg-gray-200" onClick={()=>{navigate('/admin')}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 ml-10 mt-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <a class="flex  items-center text-xl py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900  transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Dashboard</a>
        </div>
    </li>
    <li class="relative h-16 ">
        <div className="flex hover:bg-gray-200" onClick={()=>{navigate('/r-posts')}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-10 mt-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <a class="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900  transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Reported Posts</a>

        </div>
    </li>
    <li class="relative h-16 ">
        <div className="flex hover:bg-gray-200" onClick={handleLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-6 ml-7 mt-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
          <a class="flex items-center text-xl py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900  transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Log out</a>

        </div>
    </li>
  </ul>
</div>
  )
}

export default SideNavbar

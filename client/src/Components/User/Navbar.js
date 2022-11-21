import {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
function Navbar() {

const navigate = useNavigate()
const onLogout = ()=>{
  localStorage.removeItem('user')
  localStorage.removeItem('userToken')

  navigate('/login')
}
  return (    
    <nav className="nav  bg-white h-20 " >
      <div className="p-6 ">
    <h2 className="float-left text-3xl font-semibold ml-28 ">Chat <span className="text-fuchsia-800 mr-5">vibe</span></h2>
 <div >
 <button onClick={()=>{if(window.confirm('Are you sure')){ onLogout() }}} class="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Logout
      </button> 
      </div>  
      <div className="flex float-right mt-2 mr-36">   
<a href="">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" h-7 mr-5">       
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>
</a>
<a onClick={()=>{navigate('/profile')}} href=""><svg  className=" h-7   " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg></a>  
      </div>
     
</div>
<div className="down-line  h-1 bg-blue-300"></div>
  </nav>
  
  )
}

export default Navbar

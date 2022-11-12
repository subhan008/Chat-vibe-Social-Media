import {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
function Navbar() {

const navigate = useNavigate()

  return (    
    <nav className="nav p-6  h-20" >
    <h2 className="float-left text-3xl font-semibold ml-4 ">Chat <span className="text-fuchsia-800 mr-5">vibe</span></h2>
    <a onClick={()=>{navigate('/profile')}} href=""><svg  className="w-20 h-8 float-right mr-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg></a>

  </nav>
  // <button class="float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  //     Logout
  //     </button>
  )
}

export default Navbar

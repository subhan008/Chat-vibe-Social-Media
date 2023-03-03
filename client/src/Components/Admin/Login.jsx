import {useState,useEffect} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login() {

  const [login,setLogin] = useState({})
  const [loginErr,setLoginErr] = useState("")
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem("adminToken"))
  console.log(token,'----------');
   useEffect(()=>{
    if(token){
    navigate('/admin')
  }
   },[])
  const handleOnChange = (e)=>{

     setLogin({...login,[e.target.name]:e.target.value})

  }
  console.log(login,'dd');

  const handleSubmit = (e)=>{
     e.preventDefault()  
     axios.post('http://localhost:8000/admin/login',login).then((res)=>{
      console.log('6555555');
    if(res.data.valid){
      localStorage.setItem("admin",JSON.stringify(res.data.admin))
      localStorage.setItem("adminToken",JSON.stringify(res.data.token))       

      navigate('/admin')
    }else{
      setLoginErr(res.data.message)
    }
   })

  }
  return (
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20" style={{width:'28rem'}}>
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl font-semibold">Admin  Login</h1>
				</div>
                { loginErr  && <div class="bg-red-100 border mt-3 border-red-400 text-red-700  py-3 rounded relative" role="alert" style={{width:'18rem'}}>
  <span class="block sm:inline">{loginErr}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg onClick={()=>{setLoginErr()}} class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div> }
				<div class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <form action="">
						<div class="relative">
							<input onChange={handleOnChange} autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div class="relative mt-5">
							<input onChange={handleOnChange} autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div class="relative mt-10">
							<button onClick={handleSubmit} class="bg-blue-500 text-white rounded-md px-2 py-1" type="submit">Submit</button>
						</div>
                        </form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


  )
}

export default Login

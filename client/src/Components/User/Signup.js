import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

function signup() { 
  const navigate = useNavigate()
  const [signup,setSignup] = useState({})
  const [invalid,setInvalid] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [otp,setOtp] = useState('')
  const [userOtp,setUserOtp] = useState('')
  const [otpErr,setOtpErr] = useState()
  console.log(otp,'otttggtpgp');

console.log(userOtp,'otttggtpgp');

 const handleOnchange = (e)=>{
    setSignup({...signup,[e.target.name]:e.target.value})
  }

  const onSubmit = ()=>{
    if(!signup.fname=="" || !signup.lname=="" ){
       axios.post('http://localhost:8000/signup',signup).then((res)=>{
        if (res.data.err) {
          navigate('/Error-500')
        }
        if(res.data.userAdded){
          setOtp(res.data.otp)
          setShowModal(true)
        }
        else{
          console.log('sasasasa');
          setInvalid(res.data.message)
        }
      })
    }else setInvalid('Invalid Entry')
     
  }
const onVerify = ()=>{
   if(userOtp == otp){
    navigate('/login')
   }
   else{
     setOtpErr('invalid otp')
   }
}          
  console.log(signup,'+++++++++');
  return (
<div class="signup-1  flex items-center relative h-screen">
  <div class="overlay absolute inset-0 z-0 bg-gray-400 opacity-75"></div>
  <div class="container px-4 mx-auto relative z-10">
    <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
      <div class="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-indigo-600">
        <h2 class="text-3xl text-gray-800 text-center">Create Your Account</h2>
      
        <div class="signup-form mt-6 md:mt-12">
          { invalid &&
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <span class="block sm:inline">{invalid}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3" >
    <a href="" onClick={()=>{setInavlid()}}>
    <svg class="fill-current h-6 w-6 text-red-500"  role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </a>
  </span>
  
</div> }

          <div class="border-2 border-solid rounded flex mt-3 items-center mb-4">
            <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <span class="far fa-user text-gray-500"></span>
            </div>
            <div class="flex-1">
              <input onChange={handleOnchange} type="text" name="fname" placeholder="First name" class="h-10 py-1 pr-3 w-full"/>
            </div>
          </div>
          <div class="border-2 border-solid rounded flex items-center mb-4">
            <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <span class="far fa-user text-gray-500"></span>
            </div>
            <div class="flex-1">
              <input required onChange={handleOnchange} type="text" name="lname" placeholder="Last name" class="h-10 py-1 pr-3 w-full"/>
            </div>
          </div>
          <div class="border-2 border-solid rounded flex items-center mb-4">
            <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <span class="far fa-envelope text-gray-500"></span>
            </div>
            <div class="flex-1">
              <input required onChange={handleOnchange} type="email" name="email" placeholder="E-mail" class="h-10 py-1 pr-3 w-full"/>
            </div>
          </div>

          <div class="border-2 border-solid rounded flex items-center mb-4">
            <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
              <span class="fas fa-asterisk text-gray-500"></span>
            </div>
            <div class="flex-1">
              <input onChange={handleOnchange} type="password" name="password" placeholder="Password" class="h-10 py-1 pr-3 w-full"/>
            </div>
          </div>

          <div class="text-center mt-6 md:mt-12">
            <button onClick={onSubmit} class="bg-indigo-600 hover:bg-indigo-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign Up <span class="far fa-paper-plane ml-2"></span></button>
          </div>

        </div>
        <div class="border-t border-solid mt-6 md:mt-12 pt-4">
          <p  class="text-gray-500 text-center">Already have an account, <a  onClick={()=>{navigate('/login')}}  href="" class="text-indigo-600 hover:underline">Sign In</a></p>
        </div>

      </div>
    </div>
  </div>
  {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" style={{height:"21rem"}}>
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold ml-20">
                    OTP-Verification
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/} 
                
                <h1 className="mt-1 text-gray-400" style={{marginRight:'4rem'}}>Enter the code we just send on your email</h1>
                
                <div className="relative p-6 flex-auto w-96 ">
                
                  <input onChange={(e)=>{setUserOtp(e.target.value)}} className="w-64 border-2 border-stone-400 hover:bg-sky-50 mt-7 h-11 rounded-lg" type="text"  placeholder="Enter the OTP" />
                  {otpErr && <h1 className='mr-44 text-red-500'>{otpErr}</h1>}
                </div>
                {/*footer*/}
                <div className="flex mt-3 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onVerify}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</div>

  )
}

export default signup

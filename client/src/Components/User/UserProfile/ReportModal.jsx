import {useState} from 'react'
import { Button } from "@material-tailwind/react";
import axios from "axios";
function ReportModal({setReportModal,userId}) {

const [reason,setReason] = useState('')

  const handelOnReport = (e)=>{
    e.preventDefault()  
    axios.post('http://localhost:8000/report-user',{userId:userId,reason:reason}).then((res)=>{
      location.reload()
    })   
  }    
  
  return (
    
        <>
        <div  className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}  
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-normal text-center ml-20 ">
                        Report User
                      </h3>
                       <svg onClick={() =>{setReportModal(false)} } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    </div> 
                    {/*body*/}                
    
                    <div className="relative flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"22rem",height:'14rem'}}>
                    
                     <div className="flex ml-9 mt-3  cursor-pointer" >
                     <div class="flex justify-center">
  <div>
    <div class="form-check ">
      <input onClick={()=>{setReason('its spam')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
      <label class="form-check-label ml-5 inline-block text-gray-800 mr-32 tracking-wide" for="flexRadioDefault1">
      its spam
      </label>
    </div>
    <div class="form-check mt-2">
      <input  onClick={()=>{setReason('Nudity or sexual activity')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Nudity or sexual activity
      </label>
    </div>
    <div class="form-check mt-2">
      <input onClick={()=>{setReason('Bullying or harassment')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Bullying or harassment
      </label>
    </div>
    <div class="form-check mt-2">
      <input onClick={()=>{setReason('Hate speech or symbols')}} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
      <label class="form-check-label inline-block text-gray-800 tracking-wide" for="flexRadioDefault2">
      Hate speech or symbols
      </label>
    </div>
  </div>
</div>
                      </div>
                      <Button className="mt-7 " color="red" onClick={handelOnReport}>Report</Button>
                    </div>
                    {/*footer*/}
                    
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>  
              </>
  )
}

export default ReportModal

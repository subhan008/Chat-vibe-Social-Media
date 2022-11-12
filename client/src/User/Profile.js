import React,{useState} from 'react'
import Navbar from "./Navbar";
function Profile() {


    const [showModal, setShowModal] = useState(false);
console.log(showModal);
  return (
    <>
     <Navbar />
    <div className="container">
        <div className="flex mt-10">
          <div class="">
            <img className="rounded-full ml-96 h-54" src="Screenshot_2021-10-16-20-02-13-74_1c337646f29875672b5a61192b9010f9.jpg" alt="" />
           </div>
           <div className="mt-16 ml-24">
              <h1 className="  text-3xl font-light	">Subhan</h1>
           </div>
         </div>
         <div className="mt-28">
            <div className='px-28 '>
              <hr className="   bg-black" />
              
              </div>
              <div className="flex justify-between">
                <div>

                </div>
                <div className="flex ml-36">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                 </svg>

              <p className="mt-0.5 font-medium  text-sm">POSTS</p>
                </div>
              <div className="flex justify-end mr-36 mt-1 " > 
 
                 <h2 className=" font-medium text-blue-600/100">Share Posts </h2>
                     <a   ><svg href="" onClick={()=>setShowModal(true) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg></a>
              </div>
              </div>
         </div>
         {showModal ? (
        <>
          <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal text-center">
                    Create New Post
                  </h3>
                  <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

                 
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto mt-16 rounded-lg" style={{width:"30rem",height:'22rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                   </svg>

                  <p className="my-4 text-slate-500 text-lg font-normal leading-relaxed mt-3">
                  Drag Your Photos and Videos Here
                  </p>  
                <form action="">
                    
                    <input required class="block w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
                        
                        
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 mt-4">Caption</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write Caption..."></textarea>
<button
                    className="bg-blue-500 mt-12 h-10 w-40 pb-0 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Share
                  </button>
                </form>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-16">
                   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
    </>
  )
}

export default Profile

import {useState,useEffect} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Search({setShowModal}) {

const navigate = useNavigate()
const [searchInput,setSearchInput] = useState(null)
const [searchResult,setSearchResult] = useState(null)

console.log(searchInput,'srchhhey');
const handleOnChange = (e)=>{
      }  

const handleOnSearch = (e)=>{
    console.log('mjmmjmjm');
    setSearchInput(e.target.value)
    axios.post('http://localhost:8000/search-user',{user:e.target.value}).then((res)=>{
        setSearchResult(res.data.user)
    })
   }

  return (
    <>
    {/* <div className="w-64 h-32 ml-10 bg-gray-50 rounded-xl">
    <h1 className="text-3xl mr-36 mt-5">Search</h1>
  <div className="flex pt-4 ml-2"> 
  <form action="">
     <input  className="w-48 h-10 border-2 border-stone-400 rounded-l-lg   " onChange={handleOnChange} placeholder="Add comment" type="text"/>
     </form>
     <button className="w-11 h-10 bg-blue-400 rounded-r-lg" onClick={handleOnSearch}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 text-white">
     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
     </svg>
    </button>
    
    </div>
  </div> */}
    <div
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}  
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal text-center ml-40 ">
                    Search
                  </h3>
                  <svg onClick={() => setShowModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}                
                 <input type="text" onChange={handleOnSearch} className="w-96 h-10 border-2 border-stone-400 rounded-full py-2 px-4 ml-6" placeholder="Search"/>

                <div className="relative p-6 flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"27rem",height:'20rem'}}>
                 {searchResult?
                 <div className="flex justify-between mt-3 hover:bg-slate-100 cursor-pointer" onClick={()=>{}}>
                    
                    <div className="flex">     
                  <img className="w-12 h-12 rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
                   
                    <h1 className="ml-3 font-normal  text-lg mt-2">{searchResult.fname}</h1>
                    </div>
                  </div>:
                 searchInput && <div className="flex justify-center">
                    <div className="flex mr-5 mt-5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 mt-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    
                    <h1 className="text-3xl ml-3">No user found</h1>
                    </div>
                    
                  </div>  }


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-16">
                   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>          
  </>
  )
}

export default Search

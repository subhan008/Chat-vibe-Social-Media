import React from 'react'
import axios   from "axios";
function Suggestions() {
  return (
    <div className="w-96 h-60 mr-5 bg-white rounded-xl " style={{width:"25rem"}}>
     <h1 className="font-medium text-gray-500">Suggestions for u</h1>
      <div className="flex mt-5 ">
       <img className="w-8 h-8 rounded-full ml-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDheuafnrCB0q-VE5n3RLRREX5dN3JrdJzJF76tz0y80fP4uNM0ZTtXbXWA-e2yuWKKk&usqp=CAU" alt="" />
       <div className='flex '>
         <h1 className="ml-3 font-normal">subhandsd dsdsd</h1>
         <h1 className="ml-40 text-blue-500 font-medium">Follow</h1>
       </div>
      </div>
    </div>
  )
}

export default Suggestions

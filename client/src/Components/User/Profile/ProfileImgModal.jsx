import {useState} from 'react'
import axios from "axios";
function ProfileImgModal({user,setProfileImgModal}) {
const [image,setImage] = useState()
console.log(image,'imgggggggg');

    const handleUploadImage = (e)=>{ 
             console.log(e.target.files[0],'8888888');

        if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpeg"){
            const data = new FormData()
            data.append('file',e.target.files[0]);
            axios.post(`http://localhost:8000/add-profile-photo/${user._id}`,data).then(()=>{
              if (res.data.err) {
                navigate('/Error-500')
              }
               location.reload()
            })   
        }
        else {
            console.log('jjjjjjjj');
        }
    }

    const handleRemoveProfile = ()=>{
        axios.put(`http://localhost:8000/remove-profile-photo` , {userId:user._id}).then(()=>{
          if (res.data.err) {
            navigate('/Error-500')
          }
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
                    Change Profile Image
                  </h3>
                  <svg onClick={() =>{setProfileImgModal(false)} } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black-100  w-8 h-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
                </div>
                {/*body*/}                

                <div className="relative p-6 flex-auto mt- rounded-lg mt-2 overflow-auto" style={{width:"27rem",height:'7rem'}}>
                
                 <div className="flex justify-center mt-3  cursor-pointer" >
                    {user?.profileImg? 
                    <div className="mt" style={{marginTop:"-41px"}} >                     
                      <h1 className="ml-3 font-semibold  text-lg mt-2 text-blue-500">
                      <span>Upload image</span> 
                      <input class="cursor-pointer absolute opacity-0" onChange={handleUploadImage} type="file" name="file" multiple style={{marginLeft:'-191px'}}/>                   
                      </h1>
                      <hr className=" w-96 bg-black mt-3"/>
                      <h1 className="ml-3 font-semibold text-lg mt-2 text-red-500" onClick={handleRemoveProfile}>Remove current image</h1>
                    </div>
                    :
                    <div className="cursor-pointer" style={{marginTop:"-12px"}} >                     
                    <h1 className="ml-3 font-semibold  text-lg mt-2 text-blue-500">
                    <span>Upload image</span> 
                     <input onChange={handleUploadImage} class="cursor-pointer absolute  opacity-0" type="file" name="file" multiple style={{marginLeft:'-191px'}}/>  </h1>                    
                  </div>
                     }
                  </div>
                   


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b ">
                   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>  
          </>
  )
}
 
export default ProfileImgModal

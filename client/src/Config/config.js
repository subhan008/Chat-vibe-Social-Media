const jwtToken = localStorage.getItem('userToken')

console.log(jwtToken,'he8111iiiiiii');
export const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`      
  },
}


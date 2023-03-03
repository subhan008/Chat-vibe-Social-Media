const jwtToken = localStorage.getItem('adminToken')

console.log(jwtToken,'he8111iiiiiii');
export const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`      
  },
}

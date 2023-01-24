const jwtToken = localStorage.getItem('userToken')

console.log(jwtToken,'heiiiiiii');
export const config = {
  credentials: 'include',
  headers: {
    'Content-Type': "application/json",
    authorization: `Bearer ${jwtToken}`      
  },
}


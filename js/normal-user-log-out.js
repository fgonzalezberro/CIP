// Normal User Logout
const normalUserLogOut = () =>{
  localStorage.removeItem('temporalUser');
  localStorage.removeItem('temporalUserPass');
}

export{ normalUserLogOut };

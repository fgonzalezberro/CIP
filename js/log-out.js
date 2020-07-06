import { ajaxRequest } from './ajax-request.js';

// Log Out Function
const logOut = () =>{
  $(document).on('click' , '.nav-log-out' , function(){
    const logOutMessage = document.querySelector('.log-out-message');
    const logOutBtn = document.querySelector('.log-out-btn');
    const notLogOutBtn = document.querySelector('.false-log-out-btn');

    // Show Log Out Message
    logOutMessage.classList.remove('fadeOutUp');
    logOutMessage.classList.add('wow' , 'animated' , 'fadeInUp', 'slow');
    logOutMessage.style.display = 'flex';


    // LogOut
    logOutBtn.addEventListener('click' , () =>{
      firebase.auth().signOut()
      .then(() =>{
        console.log('Se cerro la sesion correctamente');
        ajaxRequest('../components/login.html');
      })
      .catch(() =>{
        alert('No se pudo cerrar la sesion correctamente');
      })
    });

    // Not LogOut
    notLogOutBtn.addEventListener('click' , () =>{
      logOutMessage.classList.remove('fadeInUp');
      logOutMessage.classList.add('fadeOutUp');
    });
  });
}

export { logOut };

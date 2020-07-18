// Import Ajax Request
import { ajaxRequest } from './ajax-request.js';

// Login Validation
const loginValidation = () =>{
  // User Name Validation
  $(document).on('keyup', '.login-username', function(){
    const loginUserName = document.querySelector('.login-username');
    const loginUserNameValue = loginUserName.value;
    const userCheck = document.querySelector('.user-check');
    const userUnCheck = document.querySelector('.user-un-check');

    // Username Validation
    if(loginUserNameValue.length > 8 && loginUserNameValue != ''){
      userCheck.style.display = 'block';
      userUnCheck.style.display = 'none';
    }else if(loginUserNameValue.length <= 8 && loginUserNameValue != ''){
      userCheck.style.display = 'none';
      userUnCheck.style.display = 'block';
    }else{
      userCheck.style.display = 'none';
      userUnCheck.style.display = 'none';
    }
  });

  // Password Validation
  $(document).on('keyup', '.login-password', function(){
    const loginPassword = document.querySelector('.login-password');
    const loginPasswordValue = loginPassword.value;
    const passCheck = document.querySelector('.pass-check');
    const passUnCheck = document.querySelector('.pass-un-check')

    // Password Validation
    if(loginPasswordValue.length > 5 && loginPasswordValue != ''){
      passCheck.style.display = 'block';
      passUnCheck.style.display = 'none';
    }else if(loginPasswordValue.length <= 5 && loginPasswordValue != ''){
      passCheck.style.display = 'none';
      passUnCheck.style.display = 'block';
    }else{
      passCheck.style.display = 'none';
      passUnCheck.style.display = 'none';
    }
  });
}

// Login Users Function
const loginUsers = () =>{
  $(document).on('click', '.login-button', function(){
    const loginUserName = document.querySelector('.login-username');
    const loginPassword = document.querySelector('.login-password');
    const errorMessage = document.querySelector('.error-login-message');
    const errorMessage2 = document.querySelector('.error-login-message-2');
    const successMessage = document.querySelector('.success-login-message');
    const userCheck = document.querySelector('.user-check');
    const userUnCheck = document.querySelector('.user-un-check');
    const passCheck = document.querySelector('.pass-check');
    const passUnCheck = document.querySelector('.pass-un-check')
    const selectUserRole = document.querySelector('.select-user-role');

    if(selectUserRole.value !== '' && selectUserRole.value == 'admin'){
      // Check existent user
      firebase.auth().signInWithEmailAndPassword(loginUserName.value , loginPassword.value)
        .catch(function(error) {
         // var errorCode = error.code;
         // var errorMessage = error.message;
         // console.log(errorCode)
         // console.log(errorMessage);

         // Show Error Message
         errorMessage.classList.remove('fadeOutLeft');
         errorMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slower');
         errorMessage.style.display = 'flex';
         userCheck.style.display = 'none';
         userUnCheck.style.display = 'none';
         passCheck.style.display = 'none';
         passUnCheck.style.display = 'none';

         // Hide Error message
         setTimeout(() =>{
           errorMessage.classList.add('fadeOutLeft');

           // Clean input fields
           loginUserName.value = '';
           loginPassword.value = '';

           setTimeout(() => {
             errorMessage.style.display = 'none';
           },1000);
         }, 3000);
       });

       // Action if user is logged in
       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           // User is signed in.
           var displayName = user.displayName;
           var email = user.email;
           var emailVerified = user.emailVerified;
           var photoURL = user.photoURL;
           var isAnonymous = user.isAnonymous;
           var uid = user.uid;
           var providerData = user.providerData;

           // Show Success Message
           successMessage.classList.remove('fadeOutLeft');
           successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
           successMessage.style.display = 'flex';
           userCheck.style.display = 'none';
           userUnCheck.style.display = 'none';
           passCheck.style.display = 'none';
           passUnCheck.style.display = 'none';

           // Hide Success Message
           setTimeout(() =>{
             successMessage.classList.add('fadeOutLeft');

             // Clean input fields
             loginUserName.value = '';
             loginPassword.value = '';

             setTimeout(() =>{
               successMessage.style.display = 'none';
             }, 1000);
           }, 3000);

           setTimeout(() =>{
             if(uid === '27zKvJQsvIX8Qs9CyDS7TpV5VCA3'){
                ajaxRequest('../components/admin-dashboard.html');
              }
           }, 2000);
         }
         else {
           // User is signed out.
         }
       });
    }else if(selectUserRole.value !== '' && selectUserRole.value === 'client'){
      const dataBaseUsersRef = firebase.database().ref('/users');

      dataBaseUsersRef.once("value", function(snapshot){
        let showData = snapshot.val();

        // Iterate Database and select info to display in courses Content
        for(var key in showData){
          if(loginUserName.value === showData[key].userEmail && loginPassword.value === showData[key].userPass){

            // Show Success Message
            successMessage.classList.remove('fadeOutLeft');
            successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
            successMessage.style.display = 'flex';
            userCheck.style.display = 'none';
            userUnCheck.style.display = 'none';
            passCheck.style.display = 'none';
            passUnCheck.style.display = 'none';

            // Save data into Locas Storage
            localStorage.setItem('temporalUser' ,  loginUserName.value);
            localStorage.setItem('temporalUserPass' ,  loginPassword.value);
            localStorage.setItem('userKey' , key);

            // Hide Success Message
            setTimeout(() =>{
              successMessage.classList.add('fadeOutLeft');

              // Clean input fields
              loginUserName.value = '';
              loginPassword.value = '';

              setTimeout(() =>{
                successMessage.style.display = 'none';
              }, 1000);
            }, 3000);

            setTimeout(() =>{
              ajaxRequest('../components/users-dashboard.html');
            },3000);
          }
        }
      });

      setTimeout(() =>{
        if(localStorage.getItem('temporalUser') === null){
          errorMessage.classList.remove('fadeOutLeft');
          errorMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slower');
          errorMessage.style.display = 'flex';

          // Hide Error message
          setTimeout(() =>{
            errorMessage.classList.add('fadeOutLeft');

            setTimeout(() => {
              errorMessage.style.display = 'none';
            },1000);
          }, 3000);
        }
      }, 4000);
    }else{
      errorMessage2.classList.remove('fadeOutLeft');
      errorMessage2.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slower');
      errorMessage2.style.display = 'flex';

      // Hide Error message
      setTimeout(() =>{
        errorMessage2.classList.add('fadeOutLeft');

        setTimeout(() => {
          errorMessage2.style.display = 'none';
        },1000);
      }, 3000);
    }
  });
}

// Export loginValidation & loginUsers function
export { loginValidation , loginUsers };

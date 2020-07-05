// Login Validation
const loginValidation = () =>{
  // User Name Validation
  $(document).on('keyup', '.login-username', function(){
    let loginUserName = document.querySelector('.login-username');
    let loginUserNameValue = loginUserName.value;
    let userCheck = document.querySelector('.user-check');
    let userUnCheck = document.querySelector('.user-un-check');

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
    let loginPassword = document.querySelector('.login-password');
    let loginPasswordValue = loginPassword.value;
    let passCheck = document.querySelector('.pass-check');
    let passUnCheck = document.querySelector('.pass-un-check')

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
    let loginUserName = document.querySelector('.login-username');
    let loginPassword = document.querySelector('.login-password');

    // Check existent user
    firebase.auth().signInWithEmailAndPassword(loginUserName.value , loginPassword.value)
      .catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode)
       console.log(errorMessage);

       // Show Success Message
       $('.error-login-message').slideDown();

       // Hide error message
       setTimeout(() =>{
         $('.error-login-message').slideUp();

         // Clean input fields
         loginUserName.value = '';
         loginPassword.value = '';
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
         $('.success-login-message').slideDown();

         setTimeout(() =>{
           // Hide Success Message
           $('.success-login-message').slideUp();
         }, 1500);

         setTimeout(() =>{
           if(uid === 'YEvESS87g5aEEKpY9xxZvmZE8xt2'){
              alert('Admin User');
            }else{
              alert('Normal User');
            }
         }, 2500);
       }
       else {
         // User is signed out.
       }
     });
    });
}

export { loginValidation , loginUsers };

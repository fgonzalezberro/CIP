// Change Password - New Pass Validation -
const changePasswordNewPassValidation = () =>{
  const newPassCheck = document.querySelector('.new-pass-check');
  const newPassUnCheck = document.querySelector('.new-pass-un-check');
  const newPass = document.querySelector('.new-pass');
  const newPassValue = newPass.value;

  if(newPassValue.length >= 6 && newPassValue != ''){
    newPassCheck.classList.add('wow' , 'animated' , 'fadeInRight' , 'fast');
    newPassCheck.style.display = 'block';
    newPassUnCheck.classList.remove('wow' , 'animated' , 'fadeInRight' , 'fast');
    newPassUnCheck.style.display = 'none';
  }else if(newPassValue.length < 6 && newPassValue != ''){
    newPassCheck.classList.remove('wow' , 'animated' , 'fadeInRight' , 'fast');
    newPassCheck.style.display = 'none';
    newPassUnCheck.classList.add('wow' , 'animated' , 'fadeInRight' , 'fast');
    newPassUnCheck.style.display = 'block';
  }else{
    newPassUnCheck.style.display = 'none';
    newPassCheck.style.display = 'none';
  }
}

// Change Password - Confirm Pass Validation -
const changePasswordConfirmPassValidation = () =>{
  const confirmPassCheck = document.querySelector('.confirm-new-pass-check');
  const confirmPassUnCheck = document.querySelector('.confirm-new-pass-un-check');
  const confirmPass = document.querySelector('.confirm-pass');
  const confirmPassValue = confirmPass.value;
  const newPass = document.querySelector('.new-pass');
  const newPassValue = newPass.value;

  if(confirmPassValue === newPassValue){
    confirmPassCheck.classList.add('wow' , 'animated' , 'fadeInRight' , 'fast');
    confirmPassCheck.style.display = 'block';
    confirmPassUnCheck.classList.remove('wow' , 'animated' , 'fadeInRight' , 'fast');
    confirmPassUnCheck.style.display = 'none';
  }else if(confirmPassValue === ''){
    confirmPassUnCheck.style.display = 'none';
    confirmPassCheck.style.display = 'none';
  }else{
    confirmPassCheck.classList.remove('wow' , 'animated' , 'fadeInRight' , 'fast');
    confirmPassCheck.style.display = 'none';
    confirmPassUnCheck.classList.add('wow' , 'animated' , 'fadeInRight' , 'fast');
    confirmPassUnCheck.style.display = 'block';
  }
}

// Change Password
const changePassword = () =>{
  const newPass = document.querySelector('.new-pass');
  const confirmPass = document.querySelector('.confirm-pass');
  const newPassValue = newPass.value;
  const confirmPassValue = confirmPass.value;
  const successMessage = document.querySelector('.success-change-password-message');
  const errorMessage = document.querySelector('.error-change-password-message');
  const newPassCheck = document.querySelector('.new-pass-check');
  const newPassUnCheck = document.querySelector('.new-pass-un-check');
  const confirmPassCheck = document.querySelector('.confirm-new-pass-check');
  const confirmPassUnCheck = document.querySelector('.confirm-new-pass-un-check');

  const user = firebase.auth().currentUser;

  if(newPassValue === confirmPassValue && newPassValue.length >= 6 && confirmPassValue.length >= 6){
    user.updatePassword(newPassValue).then(function() {
      successMessage.classList.remove('fadeOutLeft');
      successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
      successMessage.style.display = 'flex';
      confirmPassUnCheck.style.display = 'none';
      confirmPassCheck.style.display = 'none';
      newPassUnCheck.style.display = 'none';
      newPassCheck.style.display = 'none';

      // Hide Success Message
      setTimeout(() =>{
        successMessage.classList.add('fadeOutLeft');

        // Clean input fields
        newPass.value = '';
        confirmPass.value = '';

        setTimeout(() =>{
          successMessage.style.display = 'none';
        }, 1000);
      }, 3000);
    }).catch(function(error) {
      alert('No se puedo cambiar la contrasña');
    });
  }else{
    errorMessage.classList.remove('fadeOutLeft');
    errorMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slower');
    errorMessage.style.display = 'flex';
    confirmPassUnCheck.style.display = 'none';
    confirmPassCheck.style.display = 'none';
    newPassUnCheck.style.display = 'none';
    newPassCheck.style.display = 'none';

    // Hide Error message
    setTimeout(() =>{
      errorMessage.classList.add('fadeOutLeft');

      // Clean input fields
      newPass.value = '';
      confirmPass.value = '';

      setTimeout(() => {
        errorMessage.style.display = 'none';
      },1000);
    }, 3000);
  }
}

export { changePasswordNewPassValidation , changePasswordConfirmPassValidation , changePassword };

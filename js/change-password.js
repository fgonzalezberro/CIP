// Change Password
const changePassword = () =>{
  const newPassCheck = document.querySelector('.new-pass-check');
  const newPassUnCheck = document.querySelector('.new-pass-un-check');
  const confirmPassCheck = document.querySelector('.confirm-new-pass-check');
  const confirmPassUnCheck = document.querySelector('.confirm-new-pass-un-check');
  const newPass = document.querySelector('.new-pass');
  const confirmPass = document.querySelector('.confirm-pass');
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

export { changePassword };

// Admin dashboard mobile nav
const mobileNavToggle = () =>{
  const mobileComponent = document.querySelector('.ul-component-admin');

  if($(window).width() <= 1320){
    $(mobileComponent).slideToggle(300);
    $(mobileComponent).toggleClass('flex');
  }
}

const hideAdminDashNavMobile = () =>{
  const mobileComponent = document.querySelector('.ul-component-admin');

  $(mobileComponent).slideToggle(300);
  $(mobileComponent).toggleClass('flex');
}

export { mobileNavToggle , hideAdminDashNavMobile};

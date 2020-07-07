// Firebase Config
import { firebaseConfig } from './firebase-config.js';
import { ajaxRequest } from './ajax-request.js';
import { loginValidation , loginUsers } from './login.js';
import { logOut } from './log-out.js';
import { requestAdminDashboardComponents } from './request-admin-dashboard-components.js';
import { changePassword } from './change-password.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Charge Document
window.addEventListener('load', ()=>{

  // Select Loader DOM element
  const loadingSection = document.querySelector('.loading-section');
  // Hide loader when Document is charged
  loadingSection.style.display = 'none';

  // Execute Our Clients Carousel function
  $('.our-clients-carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    infinite: true,
    arrows: true,
    slidesToScroll: 2,
    speed: 400,
    autoplay: true,
    slidesToShow: 3
  });

  // Carousel Arrows
  const leftArrow = document.querySelector('.fa-arrow-left');
  const rightArrow = document.querySelector('.fa-arrow-right');

  leftArrow.addEventListener('click' , () =>{
    document.querySelector('.slick-prev').click();
  });

  rightArrow.addEventListener('click' , () =>{
    document.querySelector('.slick-next').click();
  });

  // Capture login button element
  const loginNavBtn = document.getElementById('login-nav-btn');

  // This function is exectued when the user clicked in 'Login Nav Button'
  loginNavBtn.addEventListener('click' , ()=>{
    ajaxRequest('../components/login.html');
  });

  $(document).on('click' , '.close-main', function(){
    $('.main').slideUp();
  });

  // Call login validation component
  loginValidation();

  // Login Users Function
  loginUsers();

  // Log Out Function
  logOut();

  // Call 'Change Password Component'
  $(document).on('click' , '.nav-change-password' , function(){
    requestAdminDashboardComponents('../components/change-password.html');
  });

  // Change Password Functionality
  $(document).on('keyup' , '.new-pass' , function(){
    changePassword();
  });
});

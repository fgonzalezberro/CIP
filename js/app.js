// Firebase Config
import { firebaseConfig } from './firebase-config.js';
import { ajaxRequest } from './ajax-request.js';
import { loginValidation , loginUsers } from './login.js';
import { logOut } from './log-out.js';
import { requestAdminDashboardComponents } from './request-admin-dashboard-components.js';
import { changePasswordNewPassValidation , changePasswordConfirmPassValidation , changePassword } from './change-password.js';
import { addNewUser , setUserImage } from './add-users.js';
import { addGenerateCertificationsAnimation , removeGenerateCertificationsAnimation , chargeSelectUsers , clickSelectCertFileInput , uploadCertificatesOnDB , inputFileChange , chargeSelectCertificates } from './generate-certifications.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// Firebase Database Ref
const storageRef = firebase.storage().ref();

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
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          dots: false,
          arrows: true,
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
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

  // Mobile button functionality
  const mobileBtn = document.querySelector('.mobile-nav-btn');
  const ul = document.querySelector('.ul-component');

  mobileBtn.addEventListener('click' , () =>{
    if($(window).width() < 1100){
      $(ul).slideToggle(300);
      $(ul).toggleClass('flex');
    }
  });

  $(ul).children('a').click(() =>{
    if($(window).width() < 1100){
      $(ul).slideToggle(300);
      $(ul).toggleClass('flex');
    }
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

  // Change Password (User validation)
  $(document).on('keyup' , '.new-pass' , function(){
    changePasswordNewPassValidation();
  });

  // Change Password (Password validation)
  $(document).on('keyup' , '.confirm-pass' , function(){
    changePasswordConfirmPassValidation();
  });

  // Change Password
  $(document).on('click' , '.confirm-new-pass-btn' , function(){
    changePassword();
  });

  // Call 'Add Users Component'
  $(document).on('click' , '.nav-add-user' , function(){
    requestAdminDashboardComponents('../components/add-users.html');
  });

  // Add user
  $(document).on('click' , '.new-user-logo-link' , function(){
    setUserImage();
  });

  $(document).on('click' , '.up-new-user-btn' , function(){
    addNewUser();
  });

  // Call 'Generate certificate'
  $(document).on('click' , '.nav-generate-certificate' , function(){
    requestAdminDashboardComponents('../components/generate-certificate.html');
  });

  $(document).on('mouseover' , '.upload-certification-content' , function(){
    addGenerateCertificationsAnimation();
  });

  $(document).on('mouseleave' , '.upload-certification-content' , function(){
    removeGenerateCertificationsAnimation();
  });

  // Click Add Certificate input file
  $(document).on('click' , '.upload-certification-content' , function(){
    clickSelectCertFileInput();
  });

  // Set Certifications into DB
  $(document).on('click' , '.upload-certificate' , function(){
    uploadCertificatesOnDB();
  });

  // Detect change on 'Add Cert' input file
  inputFileChange();

  // Charge Users and Certificates on Select Dropbox's
  $(document).on('click' , '.acept-cert-message' , function(){
    // Charge Users in Select Dropbox
    chargeSelectUsers();

    // Charge Certificates in Select Dropbox
    chargeSelectCertificates();

    // Hide Certificate Message
    const certificateMessage = document.querySelector('.certificate-message');
    $(certificateMessage).slideUp();
  });
});

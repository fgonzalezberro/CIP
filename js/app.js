// Firebase Config
import { firebaseConfig } from './firebase-config.js';

// Other external Scripts
import { ajaxRequest } from './ajax-request.js';
import { loginValidation , loginUsers } from './login.js';
import { logOut } from './log-out.js';
import { requestAdminDashboardComponents } from './request-admin-dashboard-components.js';
import { changePasswordNewPassValidation , changePasswordConfirmPassValidation , changePassword } from './change-password.js';
import { addNewUser , setUserImage } from './add-users.js';
import { addGenerateCertificationsAnimation , removeGenerateCertificationsAnimation , chargeSelectUsers , clickSelectCertFileInput , uploadCertificatesOnDB , inputFileChange , chargeSelectCertificates , assignCertificate } from './generate-certifications.js';
import { mobileNavToggle , hideAdminDashNavMobile } from './admin-dashboard-mobile-nav.js';
import { normalUserLogOut } from './normal-user-log-out.js';
import { requestUserDashboard } from './request-user-dashboard-components.js';
import { chargeCertificationsTable , setUserStyles } from './charge-certifications-table.js';

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

  // Mobile button functionaliy
  // Control flag
  let mobileState = false;

  $(document).on('click' , '.mobile-nav-btn' , function(){
    if(!mobileState){
      $('.mobile-options').css('width' , '100%');
      $('.nav-li').css('display' , 'block');
      mobileState = true;
    }else{
      $('.mobile-options').css('width' , '0%');
      $('.nav-li').css('display' , 'none');
      mobileState = false;
    }
  });

  $(document).on('click' , '.nav-li' , function(){
    $('.mobile-options').css('width' , '0%');
    $('.nav-li').css('display' , 'none');
    mobileState = false;
  });

  // Mobile admin nav button functionality
  $(document).on('click' , '.mobile-nav-btn-admin' , function(){
    mobileNavToggle();
  });

  $(document).on('click' , '.mobile-admin-dash' , function(){
    hideAdminDashNavMobile();
  });

  $(document).on('click' , '.login-nav-btn' , function(){
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

  // Normal User Log out
  $(document).on('click' , '.nav-user-log-out' , function(){
    normalUserLogOut();
    ajaxRequest('../components/login.html');
  });

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

  // Assign ceritifacte to user
  $(document).on('click' , '.assign-cert-btn', function(){
    assignCertificate();
  });

  // Charge certification table
  $(document).on('click' , '.nav-users-cert-btn' , function(){
    requestUserDashboard('../components/user-certifications.html');

  });

  // Charge certificates in user table
  $(document).on('click' , '.acept-cert-table-message' , function(){
    chargeCertificationsTable();
    const certificateMessage = document.querySelector('.charge-certifications-in-table');
    $(certificateMessage).slideUp();
    setUserStyles();
  });
});

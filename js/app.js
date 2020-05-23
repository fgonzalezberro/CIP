// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyB-9B8eFNyEIF2oCpHt4prvMOWLXrBRszk",
  authDomain: "control-integral-plagas.firebaseapp.com",
  databaseURL: "https://control-integral-plagas.firebaseio.com",
  projectId: "control-integral-plagas",
  storageBucket: "control-integral-plagas.appspot.com",
  messagingSenderId: "390728418986",
  appId: "1:390728418986:web:07b172886fdde1c1c072d3",
  measurementId: "G-EXJFLLE8LL"
};

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

  // Capture the principal view element
  const principalView = document.querySelector('.principal-view');
  principalView.classList.add('animated' , 'fadeInDown');

  // Capture login button element
  const loginNavBtn = document.getElementById('login-nav-btn');

  // This function load 'Login dashboard' in the Principal View
  loginNavBtn.addEventListener('click' , () =>{
    principalView.style.display = "flex";
    principalView.style.flexDirection = "column";
    principalView.style.alignItems = "center";
    principalView.style.justifyContent = "center";

    // Create Login Elements
    const loginSection = document.createElement('section');
    const loginCloseBtn = document.createElement('i');
    const loginContent = document.createElement('div');

    // Append DOM Node´s in 'Login' Dashboard
    principalView.appendChild(loginSection);
    loginSection.appendChild(loginCloseBtn);
    loginSection.appendChild(loginContent);
    loginContent.innerHTML = `
                            `;

    // Add or Remove Login Elements Class
    loginSection.classList.add('login');
    loginCloseBtn.classList.add('far' , 'fa-window-close' , 'close-btn');
    loginContent.classList.add('login-content');

    // Close & clean Principal View
    document.querySelector('.close-btn').addEventListener('click', ()=>{
      principalView.style.display = "none";
      principalView.innerHTML = "";
    });
  });
});

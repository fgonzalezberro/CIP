// Users login Script
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

window.addEventListener('load' , ()=>{
  // Select Loader DOM element
  const loadingSection = document.querySelector('.loading-section');
  // Hide loader when Document is charged
  loadingSection.style.display = 'none';

  // Login in firebase
  $(".users-login-btn").click(()=>{
    let email = $(".user-id").val();
    let password = $(".user-password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
   .catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorCode);
     console.log(errorMessage);

     // Show Error
     alert('Error: Usuario o contraseña incorrecta');
   });

   // Clean fields
   $(".user-id").val('');
   $(".user-password").val('');
 });

 // User Activity Observer
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

      alert('Logueado correctamente');

      if(uid === 'YEvESS87g5aEEKpY9xxZvmZE8xt2'){
        window.location.href = '../users-login/admin-panel.html';
      }else{
        alert('Firebase: Unable to display content, Google IT team is updating the system and its database may be affected. In short, the system will stabilize again and you can see its contents. Thank you very much, Google IT team.');
      }

    }else {
      //alert('No existe usuario activo');
    }
  });
});

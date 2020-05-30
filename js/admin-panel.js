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

// Set Firebase References
let storageRef = firebase.storage().ref();
let dataBaseRef = firebase.database().ref();

window.addEventListener('load', ()=>{
  // Select Loader DOM element
  const loadingSection = document.querySelector('.loading-section');
  // Hide loader when Document is charged
  loadingSection.style.display = 'none';

 // Log out sesion
 $('.log-out-btn').click(() =>{
   firebase.auth().signOut()
   .then(() =>{
     alert('Sesión cerrada correctamente');
     window.location.href = './login.html';
   })
   .catch(() =>{
     alert('No se pudo cerrar la sesion correctamente');
   })
 });

 const chargeReportsSection = $(".charge-reports");
 const adminUsersSections = $(".admin-users");

 // Show and Hide --- Add report section ---
 $('.add-report-nav').click(() =>{
   $('.principal-container').empty();

   $(chargeReportsSection).css({
     'display' : 'flex',
     'justify-content' : 'center',
     'align-items' : 'center',
     'flex-direction' : 'column'
   });

   $('.principal-container').html($(chargeReportsSection));

   // Capture Input Radio Button value
   let controlPlace = 'No se especifica lugar';

   $('.rodents-control-int').click(function(){
     controlPlace = $(this).val();
   });

   $('.rodents-control-ext').click(function(){
     controlPlace = $(this).val();
   });

   // Complete Rodents Control Table
   let indexStations = 26;

   const paintTable = () =>{
     for(let i = 1 ; i < indexStations; i++){
       $('.rodents-control-stations').append(`<td>${i}</td>`);

       $('.rodents-control-no-news').append(`<td>
                                              <select>
                                                <option></option>
                                                <option>✓</option>
                                                <option>x</option>
                                                <select>
                                              </td>`);

       $('.rodents-control-change').append(`<td>
                                              <select>
                                                <option></option>
                                                <option> D </option>
                                                <option> H </option>
                                                <option> R </option>
                                              </select>
                                            </td>`);

        $('.rodents-control-recharge').append(`<td>
                                                <select>
                                                  <option></option>
                                                  <option>E</option>
                                                  <option>S</option>
                                                 <select>
                                               </td>`);

        $('.rodents-control-is-missing-posion').append(`<td>
                                                <select>
                                                  <option></option>
                                                  <option>✓</option>
                                                  <option>x</option>
                                                 <select>
                                               </td>`);
     }
   };

   // Execute paint table for first time
   paintTable();

   // Add one station
   let newStationsIndex = indexStations - 1;

   $('.addStations').click(() =>{

     newStationsIndex ++;

     $('.rodents-control-stations').append(`<td>${newStationsIndex}</td>`);

     $('.rodents-control-no-news').append(`<td>
                                            <select>
                                              <option></option>
                                              <option>✓</option>
                                              <option>x</option>
                                              <select>
                                            </td>`);

     $('.rodents-control-change').append(`<td>
                                            <select>
                                              <option></option>
                                              <option> D </option>
                                              <option> H </option>
                                              <option> R </option>
                                            </select>
                                          </td>`);

      $('.rodents-control-recharge').append(`<td>
                                              <select>
                                                <option></option>
                                                <option>✓</option>
                                                <option>x</option>
                                               <select>
                                             </td>`);

      $('.rodents-control-is-missing-posion').append(`<td>
                                              <select>
                                                <option></option>
                                                <option>✓</option>
                                                <option>x</option>
                                               <select>
                                             </td>`);
   });

 });

 // Show and hide  --- Admin Users Section ---
 $('.admin-users-nav').click(() =>{
   // Clean principal container
   $('.principal-container').empty();

   // Show admin user section
   $(adminUsersSections).css({
     'display' : 'flex',
     'justify-content' : 'center',
     'align-items' : 'center',
     'flex-direction' : 'column'
   });

   // Append admin users section in principal container
   $('.principal-container').html($(adminUsersSections));

   // Show and hide add users option
   $('.add-new-user-title').click(() =>{
     $('.add-new-user-inputs').slideToggle();
   });

   // Show and hide manage users
   $('.manage-all-users-title').click(() =>{
     $('.manage-all-users-content').slideToggle();
   });

   // Click input file when admin click the button
   $('.update-new-logo-btn').click(() =>{
     $('.add-new-user-logo-input').click();
   });

   // Detect change in input file
   $('.add-new-user-logo-input').change(() =>{
     alert("selecciono el logo correctamente");
   });

   const addUserBtn = document.querySelector('.add-user-btn');

   addUserBtn.addEventListener('click' , function(){
     let userEmail = document.querySelector('.add-user-email');
     let userName = document.querySelector('.add-user-name');
     let userLocation = document.querySelector('.add-user-location');
     let imageToUpload = document.querySelector('.add-new-user-logo-input').files[0];
     let userPassword = document.querySelector('.add-user-password');

     // Create a node in data base with the inputs info
     const createNodeInDataBase = (imageName, imageURL) =>{

       dataBaseRef.child('users/').push({
         userName: userName.value,
         userEmail: userEmail.value,
         userLocation: userLocation.value,
         userImageName: imageName,
         imgUrl: imageURL
       });

       alert("Usuario creado correctamente");
     }

     // Create an user
     firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
     .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        // Alert the error message
        alert(errorMessage);
    })
    .then(function(){
      // Upload logo in storage
      let uploadTask = storageRef.child('users-logo/' + imageToUpload.name).put(imageToUpload);

      // Upload storage handler
      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
          // Show progress bar
         $("#progress-bar").show();
         document.querySelector("#progress-bar").value = progress;

      }, function(error) {
          $("#progress-bar").hide();
          alert('No se pudo subir la noticia.');
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          $("#progress-bar").hide();
          createNodeInDataBase(imageToUpload.name , downloadURL);
        });
      });
    });

   });
 });
});

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

 // Show 'Add reports section'
 $('.add-report-nav').click(() =>{
   $('.principal-container').empty();

   $('.charge-reports').css({
     'display' : 'flex',
     'justify-content' : 'center',
     'align-items' : 'center',
     'flex-direction' : 'column'
   });

   $('.principal-container').append($('.charge-reports'));

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
});

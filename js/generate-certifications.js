// Add animation
const addGenerateCertificationsAnimation = () =>{
  const certContent = document.querySelector('.upload-certification-content');
  const certLogo = document.querySelector('.fa-folder-plus');

  certLogo.classList.add('animated' , 'heartBeat' , 'slow');
}

// Remove animation
const removeGenerateCertificationsAnimation = () =>{
  const certContent = document.querySelector('.upload-certification-content');
  const certLogo = document.querySelector('.fa-folder-plus');

  certLogo.classList.remove('animated' , 'heartBeat' , 'slow');
}

// Charge all users in dropbox
const chargeSelectUsers = () =>{
  const selectUser = document.querySelector('.select-user');
  const selectUserToDelete = document.querySelector('.select-user-to-delete');
  const dataBaseUsersRef = firebase.database().ref('/users');

  dataBaseUsersRef.once("value", function(snapshot){
    let showData = snapshot.val();
    let usersToParseIntoOption = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      usersToParseIntoOption += `
                                  <option value="${key}">${showData[key].userName}</option>
                                `;
    }

    // Display the Database info in 'User Select'
    $(selectUser).append(usersToParseIntoOption);
    $(selectUserToDelete).append(usersToParseIntoOption);
  });
}

// Charge all certificates in dropbox
const chargeSelectCertificates = () =>{
  const selectCertificate = document.querySelector('.select-certificate');
  const selectCertificateToDelete = document.querySelector('.select-certificate-to-delete');
  const certificateCrudTable = document.querySelector('.certificates-crud-table');
  const dataBaseUsersRef = firebase.database().ref('/certifications');

  dataBaseUsersRef.on("value", function(snapshot){
    let showData = snapshot.val();
    let certToParseIntoOption = '';
    let certToParseIntoCrudTable = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      certToParseIntoOption += `
                                  <option value="${showData[key].name}" >${showData[key].name}</option>
                                `;

      certToParseIntoCrudTable += `
                                  <tr value="${key}">
                                    <td>${showData[key].name}</td>
                                    <td><i class="fas fa-edit edit-cert ${key}" value="${key}"></i></td>
                                    <td><i class="fas fa-trash-alt delete-cert ${key}" value="${key}"></i></td>
                                  </tr>
                               `;
    }

    // Display the Database info in 'Usr Select'
    $(selectCertificate).html(certToParseIntoOption);
    $(selectCertificateToDelete).html(certToParseIntoOption);
    $(certificateCrudTable).html(certToParseIntoCrudTable);
  });
}

// Redirect false btn to input file <type> btn
const clickSelectCertFileInput = () =>{
  // Capture True file input in DOM
  const trueFileButton = document.querySelector('.select-certificate-to-upload');
  // Click hidden button
  trueFileButton.click();
}

// Detect when the input file changes
const inputFileChange = () =>{
  $(document).on('change' , '.select-certificate-to-upload' , function(){
    // Success Messagge
    const successMessage = document.querySelector('.success-select-document');

    // Show Success Message
    successMessage.classList.remove('fadeOutLeft');
    successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
    successMessage.style.display = 'flex';

    // Hide Success Message
    setTimeout(() =>{
      successMessage.classList.add('fadeOutLeft');

      setTimeout(() =>{
        successMessage.style.display = 'none';
      }, 1000);
    }, 3000);
  });
}

// Charge certifications files in Database
const uploadCertificatesOnDB = () =>{
  const inputFile = document.querySelector('.select-certificate-to-upload');
  const nameFile = document.querySelector('.certificate-name');
  const fileToUpload = inputFile.files[0];

  if(inputFile.value !== '' && nameFile.value !== ''){
    // Create an user
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('certifications/' + fileToUpload.name).put(fileToUpload);

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
      }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        $("#progress-bar").hide();

        // Call create node in data base function
        createNodeInDataBase(fileToUpload.name , nameFile.value , nameFile.title , downloadURL);
      });
    });
  }else{
    const errorMessage = document.querySelector('.error-update-document');

    // Show Error Message
    errorMessage.classList.remove('fadeOutLeft');
    errorMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slower');
    errorMessage.style.display = 'flex';

    // Hide Error message
    setTimeout(() =>{
      errorMessage.classList.add('fadeOutLeft');

      setTimeout(() => {
        errorMessage.style.display = 'none';
      },1000);
    }, 3000);

    $(inputFile).val('');
    $(nameFile).val('');
  }

  // Set data in DataBase
  const createNodeInDataBase = (fileName , name , fileURL) =>{
    // Capture current user ID
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    // Data Base Ref
    const dataBaseRef = firebase.database().ref('certifications');

    // Set the User data in data base
    dataBaseRef.push({
      fileURL: fileURL,
      fileName: fileName,
      name: name
    });

    // Success Messagge
    const successMessage = document.querySelector('.success-charge-document');

    // Show Success Message
    successMessage.classList.remove('fadeOutLeft');
    successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
    successMessage.style.display = 'flex';

    // Hide Success Message
    setTimeout(() =>{
      successMessage.classList.add('fadeOutLeft');

      setTimeout(() =>{
        successMessage.style.display = 'none';
      }, 1000);
    }, 3000);

    $(inputFile).val('');
    $(nameFile).val('');
  }
}

// Assign certificate to a user
const assignCertificate = () =>{
  const storageRef = firebase.database().ref();
  const dataBaseUsersRef  = firebase.database().ref('/users');
  const dataBaseCertRef = firebase.database().ref('/certifications');
  const userSelect = document.querySelector('.select-user');
  const certificateSelect = document.querySelector('.select-certificate');

  dataBaseUsersRef.once("value", function(snapshot){
    let showData = snapshot.val();

    for(var key in showData){
      const selectedUser = userSelect.value;

      if(selectedUser === key){
        const trueKey = key;
        dataBaseCertRef.once("value", function(snapshot){
          let certData = snapshot.val();

          for(var certKey in certData){
            const certSelected = certificateSelect.value;

            if(certSelected === certKey){
              const usCertDataBaseRef = firebase.database().ref(`/users/${trueKey}/certifications`);
              usCertDataBaseRef.push({
                certName: certData[certKey].name,
                certURL: certData[certKey].fileURL
              });

              const successMessage = document.querySelector('.success-assign-cert-message');

              // Show Success Message
              successMessage.classList.remove('fadeOutLeft');
              successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
              successMessage.style.display = 'flex';

              // Hide Success Message
              setTimeout(() =>{
                successMessage.classList.add('fadeOutLeft');

                setTimeout(() =>{
                  successMessage.style.display = 'none';
                }, 1000);
              }, 3000);
            }
          }
        });
      }
    }
  });
}

// Delete certificate to a user
const deleteCertificate = () =>{
  const storageRef = firebase.database().ref();
  const userSelect = document.querySelector('.select-user-to-delete');
  const certificateSelect = document.querySelector('.select-certificate-to-delete');
  const dataBaseUsersRef = firebase.database().ref(`/users/${userSelect.value}/certifications`);

  dataBaseUsersRef.once("value", function(snapshot){
    let showData = snapshot.val();

    for(var key in showData){
      console.log(showData[key].certName);
      console.log(certificateSelect.value);

      if(showData[key].certName === certificateSelect.value){
        firebase.database().ref(`/users/${userSelect.value}/certifications/${key}`).remove();

        const successMessage = document.querySelector('.success-delete-cert-message');

        // Show Success Message
        successMessage.classList.remove('fadeOutLeft');
        successMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
        successMessage.style.display = 'flex';

        // Hide Success Message
        setTimeout(() =>{
          successMessage.classList.add('fadeOutLeft');

          setTimeout(() =>{
            successMessage.style.display = 'none';
          }, 1000);
        }, 3000);
      }else{
        alert('¡ Error, asegurese de que el certificado este vinculado con el usuario asignado !');
      }
    }
  });
}

// Slide Certification options
const displayCertificationsOptions = () =>{
  let uploadFlagState = false;
  let assingFlagState = false;
  let deleteFlagState = false;
  let crudFlagState = false;

  $(document).on('click' , '.upload-certifications-slider' , function(){
    $('.upload-certifiction').slideToggle();
    $('.upload-certifiction').css('display' , 'flex');

    if(!uploadFlagState){
      $(this).children('i').addClass('fa-caret-up');
      $(this).children('i').removeClass('fa-caret-down');
      uploadFlagState = true;
    }else{
      $(this).children('i').addClass('fa-caret-down');
      $(this).children('i').removeClass('fa-caret-up');
      uploadFlagState = false;
    }
  });

  $(document).on('click' , '.assign-certificate-slider' , function(){
    $('.assign-certifiction-to-user').slideToggle();
    $('.assign-certifiction-to-user').css('display' , 'flex');

    if(!assingFlagState ){
      $(this).children('i').addClass('fa-caret-up');
      $(this).children('i').removeClass('fa-caret-down');
      assingFlagState  = true;
    }else{
      $(this).children('i').addClass('fa-caret-down');
      $(this).children('i').removeClass('fa-caret-up');
      assingFlagState  = false;
    }
  });

  $(document).on('click' , '.delete-certificate-slider' , function(){
    $('.delete-certifiction-to-user').slideToggle();
    $('.delete-certifiction-to-user').css('display' , 'flex');

    if(!deleteFlagState ){
      $(this).children('i').addClass('fa-caret-up');
      $(this).children('i').removeClass('fa-caret-down');
      deleteFlagState  = true;
    }else{
      $(this).children('i').addClass('fa-caret-down');
      $(this).children('i').removeClass('fa-caret-up');
      deleteFlagState  = false;
    }
  });

  $(document).on('click' , '.certificates-crud-slider' , function(){
    $('.certificates-crud').slideToggle();
    $('.certificates-crud').css('display' , 'flex');

    if(!crudFlagState){
      $(this).children('i').addClass('fa-caret-up');
      $(this).children('i').removeClass('fa-caret-down');
      crudFlagState = true;
    }else{
      $(this).children('i').addClass('fa-caret-down');
      $(this).children('i').removeClass('fa-caret-up');
      crudFlagState = false;
    }
  });
}

// CRUD functionalities
const certificatesCrud = () =>{
  let certificateToDelete = '';
  let certificateToEdit = '';

  $(document).on('click' , '.delete-cert' , function(){
    certificateToDelete = $(this)[0].getAttribute('value');

    $('.crud-delete-option').slideDown();
    $('.crud-delete-option').css('display' , 'flex');
  });

  $(document).on('click' , '.delete-cert-button' , function(){
    const dataBaseCertRef = firebase.database().ref('/certifications/'+certificateToDelete);
    dataBaseCertRef.remove();

    $('.crud-delete-option').slideUp();

    const successDeleteMessage = document.querySelector('.success-delete-cert');

    // Show Success Message
    successDeleteMessage.classList.remove('fadeOutLeft');
    successDeleteMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
    successDeleteMessage.style.display = 'flex';

    // Hide Success Message
    setTimeout(() =>{
      successDeleteMessage.classList.add('fadeOutLeft');

      setTimeout(() =>{
        successDeleteMessage.style.display = 'none';
      }, 1000);
    }, 3000);
  });

  $(document).on('click' , '.undelete-cert-button' , function(){
    $('.crud-delete-option').slideUp();
  });

  $(document).on('click' , '.edit-cert' , function(){
    certificateToEdit = $(this)[0].getAttribute('value');

    $('.crud-edit-option').slideDown();
    $('.crud-edit-option').css('display' , 'flex');
  });

  $(document).on('click' , '.edit-cert-button' , function(){
    const dataBaseCertRef = firebase.database().ref('/certifications/'+certificateToEdit);
    let newCertName = document.querySelector('.new-certification-name');

    if(newCertName.value !== ''){
      dataBaseCertRef.update({
        name: newCertName.value
      });
    }else{
      alert('Por favor, no deje vacio el nombre del certificado');
    }

    const succesEditMessage = document.querySelector('.success-edit-cert');

    // Show Success Message
    succesEditMessage.classList.remove('fadeOutLeft');
    succesEditMessage.classList.add('wow' , 'animated' , 'fadeInLeft' , 'slow');
    succesEditMessage.style.display = 'flex';

    // Hide Success Message
    setTimeout(() =>{
      succesEditMessage.classList.add('fadeOutLeft');

      setTimeout(() =>{
        succesEditMessage.style.display = 'none';
      }, 1000);
    }, 3000);

    $(newCertName).val('');
    $('.crud-edit-option').slideUp();
  });

  $(document).on('click' , '.do-not-edit-cert-button' , function(){
    $('.crud-edit-option').slideUp();
  });
}

export{
        addGenerateCertificationsAnimation,
        removeGenerateCertificationsAnimation,
        chargeSelectUsers,
        clickSelectCertFileInput,
        uploadCertificatesOnDB,
        inputFileChange,
        chargeSelectCertificates,
        assignCertificate,
        deleteCertificate,
        displayCertificationsOptions,
        certificatesCrud
      };

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

    // Display the Database info in 'Usr Select'
    $(selectUser).append(usersToParseIntoOption);
  });
}

// Charge all certificates in dropbox
const chargeSelectCertificates = () =>{
  const selectCertificate = document.querySelector('.select-certificate');
  const dataBaseUsersRef = firebase.database().ref('/certifications');

  dataBaseUsersRef.once("value", function(snapshot){
    let showData = snapshot.val();
    let certToParseIntoOption = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      certToParseIntoOption += `
                                  <option value="${key}">${showData[key].name}</option>
                                `;
    }

    // Display the Database info in 'Usr Select'
    $(selectCertificate).append(certToParseIntoOption);
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
        createNodeInDataBase(fileToUpload.name , nameFile.value , downloadURL);
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

export{ addGenerateCertificationsAnimation , removeGenerateCertificationsAnimation , chargeSelectUsers , clickSelectCertFileInput , uploadCertificatesOnDB , inputFileChange , chargeSelectCertificates, assignCertificate };

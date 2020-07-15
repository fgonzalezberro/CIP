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

  dataBaseUsersRef.on("value", function(snapshot){
    let showData = snapshot.val();
    let usersToParseIntoOption = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      usersToParseIntoOption += `
                                  <option>${showData[key].userName}</option>
                                `;
    }

    // Display the Database info in 'Usr Select'
    $(selectUser).append(usersToParseIntoOption);
  });
}

// Charge all users in dropbox
const chargeSelectCertificates = () =>{
  const selectCertificate = document.querySelector('.select-certificate');
  const dataBaseUsersRef = firebase.database().ref('/certifications');

  dataBaseUsersRef.on("value", function(snapshot){
    let showData = snapshot.val();
    let certToParseIntoOption = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      certToParseIntoOption += `
                                  <option>${showData[key].fileName}</option>
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
    alert('Selecciono un archivo correctamente');
  });
}

// Charge certifications files in Database
const uploadCertificatesOnDB = () =>{
  const inputFile = document.querySelector('.select-certificate-to-upload');
  const fileToUpload = inputFile.files[0];

  // Set data in DataBase
  const createNodeInDataBase = (fileName , fileURL) =>{
    // Capture current user ID
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    // Data Base Ref
    const dataBaseRef = firebase.database().ref('certifications');

    // Set the User data in data base
    dataBaseRef.push({
      fileURL: fileURL,
      fileName: fileName
    });

    // Success Messagge
    alert("Archivo cargado correctamente");
  }

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
      createNodeInDataBase(fileToUpload.name , downloadURL);
    });
  });
}

export{ addGenerateCertificationsAnimation , removeGenerateCertificationsAnimation , chargeSelectUsers , clickSelectCertFileInput , uploadCertificatesOnDB , inputFileChange , chargeSelectCertificates };

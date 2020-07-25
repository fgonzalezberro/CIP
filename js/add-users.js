// Add new users
const setUserImage = () =>{
  const inputFile = document.querySelector('.new-user-logo-btn');
  const falseInputFile = document.querySelector('.new-user-logo-link');

  inputFile.click();

  inputFile.addEventListener('change', () =>{
    alert('Selecciono la imagen correctamente');
  });
}

const addNewUser = () =>{

  const userName = document.querySelector('.new-user-name');
  const userEmail = document.querySelector('.new-user-email');
  const userPass = document.querySelector('.new-user-pass');
  const userLocation = document.querySelector('.new-user-location');
  const inputFile = document.querySelector('.new-user-logo-btn');
  const logoToUpload = inputFile.files[0];

  // Set data in DataBase
  const createNodeInDataBase = (imageName , imageUrl) =>{
    // Capture current user ID
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    // Data Base Ref
    const dataBaseRef = firebase.database().ref('users');

    // Set the User data in data base
    dataBaseRef.push({
      userName: userName.value,
      userEmail: userEmail.value,
      userPass: userPass.value,
      userLocation: userLocation.value,
      imageURL: imageUrl,
      imageName: imageName
    });

    // Success Messagge
    alert("Usuario creado correctamente");
  }

  // Create an user
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child('users-logo/' + logoToUpload.name).put(logoToUpload);

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

      // Call create node in data base function
      createNodeInDataBase(logoToUpload.name , downloadURL);
    });
  });
}
export { addNewUser , setUserImage };

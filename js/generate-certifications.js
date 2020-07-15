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
    console.log(showData);
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

// Charge certifications files in Database
const clickSelectCertFileInput = () =>{
  const trueFileButton = document.querySelector('.select-certificate-to-upload');
  trueFileButton.click();
}

export{ addGenerateCertificationsAnimation , removeGenerateCertificationsAnimation , chargeSelectUsers , clickSelectCertFileInput};

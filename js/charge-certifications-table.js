// Charge certifications table
const chargeCertificationsTable = () =>{
  const actualUser = localStorage.getItem('userKey');
  const dataBaseUsersRef = firebase.database().ref(`/users/${actualUser}/certifications`);
  const actualUserDatabase = firebase.database().ref(`/users/${actualUser}`);

  dataBaseUsersRef.once("value", function(snapshot){
    let showData = snapshot.val();
    let certTable = '';

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      certTable += `
                    <tr>
                      <td>${showData[key].certName}</td>
                      <td><a href="${showData[key].certURL}" target="_blank"><i class="fas fa-eye"></i> Ver</a></td>
                    </tr>
                    `;
      }

    // Display the Database info in 'Usr Select'
    $('.user-cert-table').append(certTable);
  });
}

// Set the user data on user dashboard
const setUserStyles = () =>{
  const actualUser = localStorage.getItem('userKey');
  const dataBaseUsersRef = firebase.database().ref(`/users/${actualUser}/certifications`);
  const actualUserDatabase = firebase.database().ref(`/users/${actualUser}`);
  const currentUserNav = document.querySelector('.current-user-nav');

  actualUserDatabase.once("value", function(snapshot){
    let showData = snapshot.val();
    let newUserInfo = ''

    // Iterate Database and select info to display in courses Content
    for(var key in showData){
      newUserInfo = `<img class='current-user-logo' src="${showData.imageURL}" alt="">`;
      $(currentUserNav).css('background-color' , showData.background);
      $('.li').css('color', showData.textColor);
    }

    $('.current-user-image').html(newUserInfo);
  });
}

export { chargeCertificationsTable , setUserStyles };

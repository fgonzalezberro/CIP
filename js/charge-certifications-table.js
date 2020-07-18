// Charge certifications table
const chargeCertificationsTable = () =>{
  const actualUser = localStorage.getItem('userKey');
  console.log(actualUser);
  const dataBaseUsersRef = firebase.database().ref(`/users/${actualUser}/certifications`);

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

export { chargeCertificationsTable };

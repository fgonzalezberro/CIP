// Charge Document
window.addEventListener('load', ()=>{
  // Capture the principal view element
  const principalView = document.querySelector('.principal-view');
  principalView.classList.add('animated' , 'fadeInDown');

  // Capture login button element
  const loginNavBtn = document.getElementById('login-nav-btn');

  // This function load 'Login dashboard' in the Principal View
  loginNavBtn.addEventListener('click' , () =>{
    principalView.style.display = "flex";
    principalView.style.flexDirection = "column";
    principalView.style.alignItems = "center";
    principalView.style.justifyContent = "center";

    // Create Login Elements
    const loginSection = document.createElement('section');
    const loginCloseBtn = document.createElement('i');
    const loginContent = document.createElement('div');

    // Append DOM Node´s in 'Login' Dashboard
    principalView.appendChild(loginSection);
    loginSection.appendChild(loginCloseBtn);
    loginSection.appendChild(loginContent);
    loginContent.innerHTML = `<div class="login-header">
                                <h2> LOGIN </h2>
                              </div>

                              <div class="login-form">
                                <div class="input-content">
                                  <div class="logo-content">
                                    <i class="fas fa-user"></i>
                                  </div>
                                  <input class="user-id" type="text" placeholder="Usuario">
                                </div>

                                <div class="input-content">
                                  <div class="logo-content">
                                    <i class="fas fa-key"></i>
                                  </div>
                                  <input class="user-password" type="password" placeholder="Contraseña">
                                </div>

                                <button class="login-btn">Ingresar</button>
                              </div>
                            `;

    // Add or Remove Login Elements Class
    loginSection.classList.add('login');
    loginCloseBtn.classList.add('far' , 'fa-window-close' , 'close-btn');
    loginContent.classList.add('login-content');

    // Close & clean Principal View
    document.querySelector('.close-btn').addEventListener('click', ()=>{
      principalView.style.display = "none";
      principalView.innerHTML = "";
    });
  });
});

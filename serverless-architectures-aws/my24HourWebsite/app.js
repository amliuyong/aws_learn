window.addEventListener('load', function() {
  var content = document.querySelector('.content');
  var loadingSpinner = document.getElementById('loading');
  content.style.display = 'block';
  loadingSpinner.style.display = 'none';

  var apiClient = null;

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    //responseType: 'token id_token',
    responseType: 'token id_token',
    scope: 'openid profile email',
    leeway: 60
  });

  //var loginStatus = document.querySelector('.container h4');
  var loginView = document.getElementById('login-view');
  var loginStatus = loginView;
  var homeView = document.getElementById('home-view');

  // buttons and event listeners
  var homeViewBtn = document.getElementById('btn-home-view');
  var loginBtn = document.getElementById('qsLoginBtn');
  var logoutBtn = document.getElementById('qsLogoutBtn');
  var profileBtn = document.getElementById('qsProfile');


  var modalWin = document.getElementById('user-profile-modal');
  //var modalWin = $('#user-profile-modal');
  var profileConent = document.getElementById('user-profile-raw-json');
  loginView.style.display = 'inline-block';
  homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';

  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.addEventListener('click', logout);

  profileBtn.addEventListener('click', showProfile);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function showProfile() {
    // apiClient.get("/user-profile").then(
    //   function(data) {
    //     profileConent.innerHTML = JSON.stringify(data, null, 2);
    //     $(modalWin).modal();
    //   }
    // ).catch(function(error) {
    //   console.log(error);
    //   profileConent.innerHTML = error;
    //   $(modalWin).modal('show');
    // });

    var access_token = localStorage.getItem('access_token')
    webAuth.client.userInfo(access_token, function(err, data) {
      if (err) {
        console.log("getProfile Error:" + JSON.stringify(err));
        profileConent.innerHTML = JSON.stringify(err, null, 2);
      } else {
        console.log('Profile:', data);
        profileConent.innerHTML = JSON.stringify(data, null, 2);
      }
    });
    $(modalWin).modal();

  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        homeView.style.display = 'inline-block';
        console.log(err);
        alert(
          'Error: ' + err.error +
          '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      profileBtn.style.display = 'inline-block';
      loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      profileBtn.style.display = 'none';
      loginStatus.innerHTML =
        'You are not logged in! Please log in to continue.';
    }
    configApiClient();
    configureAuthenticatedRequests();
  }

  function configureAuthenticatedRequests() {
    var id_token = localStorage.getItem('id_token')
      $.ajaxSetup({
        'beforeSend': function(xhr) {
          console.log("set JQuery Authorization: Bearer xxxxx");
          xhr.setRequestHeader('Authorization', 'Bearer ' + id_token);
        }
      });
  }

  function configApiClient() {
    var id_token = localStorage.getItem('id_token');
    var access_token = localStorage.getItem('access_token');

    console.log(`id_token: ${id_token}`);
    console.log(`access_token: ${access_token}`);

    apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 20000,
      headers: {
        'Authorization': "Bearer " + id_token
      }
    });
  }
  handleAuthentication();
  videoController.init(global_config, apiClient, isAuthenticated());
  uploadController.init(global_config, apiClient, isAuthenticated());

});

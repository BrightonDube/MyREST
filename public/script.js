checkAuthStatus();
document.addEventListener('DOMContentLoaded', function () {
  const loginGoogleButton = document.getElementById('login-google-button');
  const loginFacebookButton = document.getElementById('login-facebook-button');
  const loginGithubButton = document.getElementById('login-github-button');
  const logoutButton = document.getElementById('logout-button');
  const userInfoDisplay = document.getElementById('user-info');

  const checkAuthStatus = () => {
    fetch('/auth/status')
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          loginGoogleButton.style.display = 'none';
          loginFacebookButton.style.display = 'none';
          loginGithubButton.style.display = 'none';
          logoutButton.style.display = 'block';
          userInfoDisplay.textContent = `Logged in as: ${data.user.username || 'User'}`;
        } else {
          loginGoogleButton.style.display = 'block';
          loginFacebookButton.style.display = 'block';
          loginGithubButton.style.display = 'block';
          logoutButton.style.display = 'none';
          userInfoDisplay.textContent = 'Not logged in.';
        }
      })
      .catch((error) => {
        console.error('Error checking auth status:', error);
        userInfoDisplay.textContent = 'Error checking login status.';
      });
  };

  checkAuthStatus();

  loginGoogleButton.addEventListener('click', () => {
    window.location.href = '/auth/google';
  });

  // --- Facebook Login Button ---
  loginFacebookButton.addEventListener('click', () => {
    window.location.href = '/auth/facebook';
  });

  loginGithubButton.addEventListener('click', () => {
    window.location.href = '/auth/github';
  });

  logoutButton.addEventListener('click', () => {
    fetch('/logout', { method: 'POST' })
      .then((response) => {
        if (response.ok) {
          checkAuthStatus();
          alert('Logged out successfully!');
        } else {
          console.error('Logout failed:', response.statusText);
          alert('Logout failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('Logout error. Please try again.');
      });
  });

  const ui = SwaggerUIBundle({
    url: '/api-docs/swagger.json',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl]
  });
  window.ui = ui;
});

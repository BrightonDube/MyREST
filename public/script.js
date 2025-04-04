document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const loginGoogleButton = document.getElementById('login-google-button');
  const loginFacebookButton = document.getElementById('login-facebook-button');
  const loginGithubButton = document.getElementById('login-github-button');
  const logoutButton = document.getElementById('logout-button');
  const userInfoDisplay = document.getElementById('user-info');
  let swaggerInitialized = false;

  // Check authentication status
  const checkAuthStatus = () => {
    fetch('/auth/status')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        if (data.isAuthenticated) {
          // User is authenticated
          document.querySelectorAll('.login-button').forEach((btn) => {
            btn.style.display = 'none';
          });
          logoutButton.style.display = 'block';
          userInfoDisplay.textContent = `Logged in as: ${data.user?.username || 'User'}`;

          // Initialize Swagger UI only once
          if (!swaggerInitialized) {
            initSwaggerUI();
            swaggerInitialized = true;
          }
        } else {
          // User is not authenticated
          document.querySelectorAll('.login-button').forEach((btn) => {
            btn.style.display = 'block';
          });
          logoutButton.style.display = 'none';
          userInfoDisplay.textContent = 'Not logged in.';
        }
      })
      .catch((error) => {
        console.error('Error checking auth status:', error);
        userInfoDisplay.textContent = 'Error checking login status.';
      });
  };

  // Initialize Swagger UI
  const initSwaggerUI = () => {
    const ui = SwaggerUIBundle({
      url: '/api-docs/swagger_output.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      plugins: [SwaggerUIBundle.plugins.DownloadUrl]
    });
    window.ui = ui;
  };

  // Event listeners
  loginGoogleButton.addEventListener('click', () => {
    window.location.href = '/auth/google';
  });

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
          swaggerInitialized = false;
          checkAuthStatus();
          alert('Logged out successfully!');
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('Logout error. Please try again.');
      });
  });

  // Initial check
  checkAuthStatus();

  // Check again after page fully loads (in case of redirects)
  window.addEventListener('load', checkAuthStatus);
});

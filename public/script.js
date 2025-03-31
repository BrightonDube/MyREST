document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const logoutButton = document.getElementById("logout-button");
    const userInfoDisplay = document.getElementById("user-info");

    loginButton.addEventListener("click", () => {
        window.location.href = "/auth/google"; // Redirect to backend Google OAuth route
    });

    logoutButton.addEventListener("click", async () => {
        await fetch("/auth/logout", { method: "GET" }); // Call backend logout route
        logoutButton.style.display = 'none';
        loginButton.style.display = 'inline-block';
        userInfoDisplay.textContent = "Logged out";
        window.location.reload(); 
    });

    function checkLoginStatus() {
        fetch('/api-docs')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    return null; // Not logged in
                } else {
                    throw new Error('Failed to check login status');
                }
            })
            .then(data => {
                if (data && data.user) {
                    loginButton.style.display = 'none';
                    logoutButton.style.display = 'inline-block';
                    userInfoDisplay.textContent = `Logged in as: ${data.user.displayName || 'User'}`;
                    loadSwaggerUI();
                } else {
                    loginButton.style.display = 'inline-block';
                    logoutButton.style.display = 'none';
                    userInfoDisplay.textContent = "Not logged in";
                    loadSwaggerUI(); // Load Swagger UI in unauthenticated state
                }
            })
            .catch(error => {
                console.error("Error checking login status:", error);
                userInfoDisplay.textContent = "Error checking login status.";
                loadSwaggerUI(); // Load Swagger UI in default state on error
            });
    }

    function loadSwaggerUI() {
        const ui = SwaggerUIBundle({
            url: "/api-docs/swagger.json", // Path to your Swagger documentation
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            // No requestInterceptor needed anymore as auth is handled by backend session
        });
        window.ui = ui;
    }

    checkLoginStatus(); // Check login status on page load
});
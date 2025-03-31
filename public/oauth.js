document.getElementById("login-button").addEventListener("click", () => {
    window.location.href = "/auth/google"; // Redirect to Google OAuth login
});

document.getElementById("logout-button").addEventListener("click", async () => {
    await fetch("/auth/logout", { method: "GET", credentials: "same-origin" });
    document.getElementById("user-info").textContent = "Logged out";
});

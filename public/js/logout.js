document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();

      fetch("/api/users/logout", { method: "POST" })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/login";
          } else {
            return response.json().then((errorData) => {
              // Display a more detailed error message
              alert(`Logout failed: ${errorData.message || "Unknown error"}`);
            });
          }
        })
        .catch((error) => {
          // Handle network or other errors
          console.error("Logout request failed:", error);
          alert("Logout request failed. Please try again.");
        });
    });
  }
});

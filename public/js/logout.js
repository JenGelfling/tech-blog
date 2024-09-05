// const logout = async () => {
//     const response = await fetch('/api/users/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to log out.');
//     }
//   };

// document.querySelector('#logout').addEventListener('click', logout);

// ---------------

//   const logout = async () => {
//     const response = await fetch('/api/users/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
//   };

//   document.querySelector('#logout').addEventListener('click', logout);

//--------------------

// document.addEventListener("DOMContentLoaded", function () {
//   const logoutButton = document.getElementById("logout");

//   if (logoutButton) {
//     logoutButton.addEventListener("click", function (event) {
//       event.preventDefault();
//       // need to figure out how to actually log them out here:
//       fetch("/api/users/logout", { method: "POST" }).then((response) => {
//         if (response.ok) {
//           window.location.href = "/login";
//         } else {
//           alert("Logout failed");
//         }
//       });
//     });
//   }
// });

//-------------

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

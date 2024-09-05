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

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();
      // need to figure out how to actually log them out here:
      fetch("/api/logout", { method: "POST" }).then((response) => {
        if (response.ok) {
          window.location.href = "/login";
        } else {
          alert("Logout failed");
        }
      });
    });
  }
});

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log("Attempting to log in");

  if (email && password) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      const data = response.json();
      // console.log('Response Data:', data);

      if (response.ok) {
        console.log('Login successful:', data);
        // const logged_in = req.session.logged_in;
        // return logged_in;
        document.location.replace('/');
      } else {
        // Detailed error message from server response
        alert(data.message || 'Failed to log in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in.');
    }
  } else {
    alert('Please enter both email and password.');
  } return logged_in;
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("let's sign up")

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    console.log(username)
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#signup-form').addEventListener('submit', signupFormHandler);



const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    username: document.getElementById('username').value,
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value, 
  };

  try {
    
    const response = await fetch('https://registerjs-9d92.restdb.io/rest/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '6785cd38630e8aa92a0b1421',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Registration successful!');
      form.reset(); 
      window.location.href = 'login.html';
    } else {
      alert('Error registering. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred.');
  }
});

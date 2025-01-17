const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    username: document.getElementById('username').value.trim(),
    dob: document.getElementById('dob').value,
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
  };

  // Validate all fields are filled
  for (const [key, value] of Object.entries(formData)) {
    if (!value) {
      alert(`Please fill in the ${key} field.`);
      return;
    }
  }

  console.log('Form Data Sent:', formData);

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

    const responseData = await response.json();
    console.log('Response Data:', responseData);

    if (response.ok) {
      alert('Registration successful!');
      form.reset();
      window.location.href = 'login.html';
    } else {
      // Display all validation errors from the response
      if (responseData.list && responseData.list.length > 0) {
        const errorMessages = responseData.list.map((error) => `${error.field}: ${error.message}`).join('\n');
        alert(`Error registering:\n${errorMessages}`);
      } else {
        alert('Error registering: Unknown validation error.');
      }
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
});

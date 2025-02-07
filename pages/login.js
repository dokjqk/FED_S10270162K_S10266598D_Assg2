const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); 


  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;


  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }


  alert('Login successful! Redirecting to the home page.');

  // Save username and password to local storage
  localStorage.setItem('username', username);

  
  window.location.href = '../index.html';
});

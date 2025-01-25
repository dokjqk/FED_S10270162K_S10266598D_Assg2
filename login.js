
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); 


  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;


  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }


  alert('Login successful! Redirecting to the home page.');

  
  window.location.href = '../index.html';
});

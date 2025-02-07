

// Function to get query parameter by name
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get the query parameter 'query' and set it in the span
document.getElementById('query').textContent = getQueryParameter('query');

function updateNavLinks() {
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');

    if (username) {
        // If username exists, hide login and register links, show profile link
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        profileLink.style.display = 'block';
    } else {
        // If username does not exist, show login and register links, hide profile link
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateNavLinks);


// Function to get query parameter by name
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function updateNavLinks() {
    const username = localStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const profileLink = document.getElementById('profile-link');
    const logoutLink = document.getElementById('logout-link'); // Add this line

    if (username) {
        // If username exists, hide login and register links, show profile and logout links
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        profileLink.style.display = 'block';
        logoutLink.style.display = 'block'; // Add this line
    } else {
        // If username does not exist, show login and register links, hide profile and logout links
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
        logoutLink.style.display = 'none'; // Add this line
    }
}

function updateSearchResults() {
    const query = getQueryParameter('query');
    if (query) {
        document.getElementById('query').textContent = query;
        // Update the search results based on the query
        // This is a placeholder for actual search logic
        console.log(`Searching for: ${query}`);
    }
}

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateNavLinks();
    updateSearchResults();
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('username');
            updateNavLinks();
        });
    }
});


function updateMainImage(element) {
    const mainImage = document.getElementById('main-listing-image').querySelector('img');
    const newSrc = element.querySelector('img').src;
    mainImage.src = newSrc;
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

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateNavLinks);

document.getElementById('logout-link').addEventListener('click', function() {
    localStorage.removeItem('username');
    updateNavLinks();
});

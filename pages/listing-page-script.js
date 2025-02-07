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

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

document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('username');
            updateNavLinks();
        });
    }

    const reviewData = JSON.parse(localStorage.getItem('reviewData'));
    if (reviewData) {
        document.getElementById('listing-image-review').src = reviewData.listingImage;
        document.getElementById('profile-image-review').src = reviewData.profileImage;
        document.getElementById('username-review').textContent = reviewData.username;
        document.getElementById('listing-title-review').textContent = reviewData.listingTitle;
    
        localStorage.removeItem('reviewData');
    }

    document.getElementById('review-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username-review').textContent;
        const listingTitle = document.getElementById('listing-title-review').textContent;
        const reviewText = document.querySelector('textarea').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const review = {
            username: username,
            listingTitle: listingTitle,
            review: reviewText,
            rating: rating
        };

        fetch('https://rating-a72f.restdb.io/rest/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '67a80285600a700302de5be1'
            },
            body: JSON.stringify(review)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Review submitted successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});

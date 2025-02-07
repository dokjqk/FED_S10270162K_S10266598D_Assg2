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

function updateProfileName() {
    const username = localStorage.getItem('username');
    if (username) {
        const profileNameElement = document.querySelector('.profile-name');
        profileNameElement.textContent = username;
    }
}

function setupProfileToggle() {
    document.querySelector('.profile-listing-link').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.profile-listings').style.display = 'flex';
        document.querySelector('.profile-review-tab').style.display = 'none';
    });

    document.querySelector('.profile-reviews-link').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('.profile-listings').style.display = 'none';
        document.querySelector('.profile-review-tab').style.display = 'flex ';
    });
}

async function fetchListings() {
    try {
        const response = await fetch('https://createlistings-ca97.restdb.io/rest/listing', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '67a32396e26aa3947d3ed372'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        localStorage.setItem('listings', JSON.stringify(data)); // Save listings to local storage
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

function displayListingsFromLocalStorage() {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const listingsContainer = document.querySelector('.profile-listings');

    listings.forEach(listing => {
        if (listing.condition == "1") {
            listing.condition = "New";
        } else {
            listing.condition = "Used";
        }

        const listingElement = document.createElement('div');
        listingElement.classList.add('profile-listing-qty');

        listingElement.innerHTML = `
            <img src="${listing.image1}" alt="Listing Image">
            <h3>${listing.title}</h3>
            <h3>$${listing.price}</h3>
            <h3>${listing.condition}</h3>
        `;

        listingsContainer.prepend(listingElement); // Prepend new listing to the top
    });
}

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateNavLinks();
    updateProfileName();
    setupProfileToggle();
    fetchListings(); // Fetch and save listings to local storage
    displayListingsFromLocalStorage(); // Display listings from local storage
});




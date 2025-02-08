async function uploadImageToImgbb(file) {
    const url = "https://api.imgbb.com/1/upload";
    const apiKey = "58b70a718cedd72c0574ee6f7074a703"; // Replace with your imgbb API key
    const formData = new FormData();
    
    formData.append("image", file);
    formData.append("key", apiKey);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        return result.data.url;
    } catch (error) {
        console.error("Upload failed:", error);
        return "";
    }
}

document.getElementById('images').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageContainers = document.querySelectorAll('.create-list-image');
    let containerIndex = 0;
    
    for (let i = 0; i < files.length && i < 3 && containerIndex < imageContainers.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            while (containerIndex < imageContainers.length && imageContainers[containerIndex].innerHTML.trim() !== "") {
                containerIndex++;
            }
            if (containerIndex < imageContainers.length) {
                imageContainers[containerIndex].innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" />`;
                containerIndex++;
            }
            // Display the uploaded image in .create-list-image-big
            const bigImageContainer = document.querySelector('.create-list-image-big');
            if (bigImageContainer) {
                bigImageContainer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" />`;
            }
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector('button[type="button"]').addEventListener('click', async function(event) {
    event.preventDefault();
    
    // Get the images from .create-list-image classes
    const imageContainers = document.querySelectorAll('.create-list-image');
    let image1 = '', image2 = '', image3 = '';
    const promises = [];
    
    if (imageContainers.length > 0) {
        const imgElements = imageContainers[0].querySelectorAll('img');
        if (imgElements.length > 0) {
            const imgSrc = imgElements[0].src;
            promises.push(fetch(imgSrc).then(res => res.blob()).then(blob => uploadImageToImgbb(blob)).then(url => image1 = url));
        }
        if (imageContainers.length > 1) {
            const imgElements = imageContainers[1].querySelectorAll('img');
            if (imgElements.length > 0) {
                const imgSrc = imgElements[0].src;
                promises.push(fetch(imgSrc).then(res => res.blob()).then(blob => uploadImageToImgbb(blob)).then(url => image2 = url));
            }
        }
        if (imageContainers.length > 2) {
            const imgElements = imageContainers[2].querySelectorAll('img');
            if (imgElements.length > 0) {
                const imgSrc = imgElements[0].src;
                promises.push(fetch(imgSrc).then(res => res.blob()).then(blob => uploadImageToImgbb(blob)).then(url => image3 = url));
            }
        }
    }
    
    await Promise.all(promises);
    
    // Check if the previous images are stored
    console.log('Image 1 URL:', image1);
    console.log('Image 2 URL:', image2);
    console.log('Image 3 URL:', image3);
    
    // Get the textboxes
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const condition = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    
    const data = {
        image1: image1,
        image2: image2,
        image3: image3,
        title: title,
        price: price,
        condition: condition,
        description: description
    };
    
    // Upload the form data to RestDB
    fetch('https://createlistings-ca97.restdb.io/rest/listing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a32396e26aa3947d3ed372'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Success:', data);
    }).catch(error => {
        console.error('Error:', error);
    });
});
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
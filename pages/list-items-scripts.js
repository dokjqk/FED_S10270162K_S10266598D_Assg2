document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            let imageContainer = document.querySelector('.create-list-image');
            let attempts = 0;
            while (imageContainer && imageContainer.innerHTML.trim() !== "" && attempts < 2) {
                imageContainer = imageContainer.nextElementSibling;
                attempts++;
            }
            if (imageContainer) {
                imageContainer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" />`;
            }
            // Fill the image into .create-list-image-big
            const bigImageContainer = document.querySelector('.create-list-image-big');
            if (bigImageContainer) {
                bigImageContainer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image" />`;
            }
        };
        reader.readAsDataURL(file);
    }
});

function updateMainImage(element) {
    const mainImage = document.getElementById('main-listing-image').querySelector('img');
    const newSrc = element.querySelector('img').src;
    mainImage.src = newSrc;
}
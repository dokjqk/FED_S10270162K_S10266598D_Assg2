

// Function to get query parameter by name
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get the query parameter 'query' and set it in the span
document.getElementById('query').textContent = getQueryParameter('query');

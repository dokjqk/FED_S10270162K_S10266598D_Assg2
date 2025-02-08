document.getElementById("forgotPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value.trim().toLowerCase(); // Ensure lowercase match
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous error

    if (!email) {
        errorMessage.textContent = "Please enter your email.";
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bold";
        return;
    }

    try {
        const response = await fetch("https://registerjs-9d92.restdb.io/rest/registration?q={\"email\":\"" + email + "\"}", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "6785cd38630e8aa92a0b1421" // Replace with your actual API key
            }
        });

        const data = await response.json();

        if (data.length > 0) {
            alert("A password reset link has been sent to your email.");

            // ✅ Redirect to the login page after 3 seconds
            setTimeout(() => {
                window.location.href = "login.html"; // Change "login.html" to your actual login page URL
            }, 3000);
            
        } else {
            errorMessage.textContent = "Error: Email not found.";
            errorMessage.style.color = "red";
            errorMessage.style.fontWeight = "bold";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bold";
    }
});

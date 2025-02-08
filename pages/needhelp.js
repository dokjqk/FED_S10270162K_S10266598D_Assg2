const form = document.getElementById("helpForm");
const messageBox = document.createElement("div");
messageBox.className = "message";
form.appendChild(messageBox);

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const helpRequest = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        issue: document.getElementById("issue").value
    };

    try {
        const response = await fetch("https://needhelp-f0f6.restdb.io/rest/needhelprequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "67a618bff599215bb348b987",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(helpRequest)
        });

        if (response.ok) {
            messageBox.textContent = "Your request has been submitted successfully!";
            messageBox.classList.add("success");
            messageBox.style.display = "block";
            form.reset();

            // Redirect to the register page after a successful submission
            setTimeout(() => {
                window.location.href = "register.html"; // Redirect to the register page
            }, 2000); // 2-second delay before redirecting

        } else {
            messageBox.textContent = "Error submitting request. Please try again.";
            messageBox.classList.add("error");
            messageBox.style.display = "block";
        }
    } catch (error) {
        messageBox.textContent = "Something went wrong. Please check your internet connection.";
        messageBox.classList.add("error");
        messageBox.style.display = "block";
    }
});

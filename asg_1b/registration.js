document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const hobbies = Array.from(document.querySelectorAll('input[name="hobby"]:checked')).map(el => el.value);
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        hobbies: hobbies.join(", "),
        gender: gender
    };

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to submit data");
        }
        return response.json();
    })
    .then(data => {
        
        document.getElementById("registerMessage").innerText = "Registration Successful!";
        document.getElementById("registerMessage").style.display = "block";

        window.location.href = "summary.html";
        // setTimeout(() => {
            
        // }, 2000);
    })
    .catch(error => console.error("Error:", error));
});

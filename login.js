document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("loginMessage");

    // Validation
    if (!/^[a-zA-Z]{1,10}$/.test(username)) {
        alert("Username must be alphabets only (max 10)");
        return;
    }
    if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}/.test(password)) {
        alert("Password must contain atleast  a digit, a special symbol, and an uppercase letter and minimum length length should be 8 charcater long");
        return;
    }

    if (username === "demouser" && password === "Demo@123") {
        messageBox.innerText = "Login Successful!";
        messageBox.style.display = "block";
        setTimeout(() => window.location.href = "registration.html", 2000);
    } else {
        alert("Invalid credentials!");
    }
});

function resetForm() {
    document.getElementById("loginForm").reset();
}

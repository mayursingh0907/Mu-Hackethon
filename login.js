     document.addEventListener("DOMContentLoaded", function() {
        const loginButton = document.querySelector('.button1');
        const usernameInput = document.querySelector('.input-field[type="text"]');
        const passwordInput = document.querySelector('.input-field[type="password"]');

        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent form submission

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Simple validation
            if (username === "" || password === "") {
                alert("Please fill in both fields.");
                return;
            }

            // Simulate a login process (you can replace this with actual authentication logic)
            if (username === "admin" && password === "password") {
                alert("Login successful!");
                // Redirect or perform other actions here
            } else {
                alert("Invalid username or password.");
            }
        });
    });

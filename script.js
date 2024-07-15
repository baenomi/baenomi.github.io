document.addEventListener("DOMContentLoaded", function() {
    // Login logic
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("username").value.toLowerCase();
            const password = document.getElementById("password").value;

            let user_records = JSON.parse(localStorage.getItem("users")) || [];
            const user = user_records.find(user => user.username.toLowerCase() === username && user.password === password);

            if (username === "admin" && password === "admin") {
                window.location.href = "admin.html";
                return;
            }

            if (user) {
                alert('Login successful!');
                localStorage.setItem("loggedInUser", username);
                window.location.href = "dashboard.html";
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Function to get the current user
    function getCurrentUser() {
        return localStorage.getItem("loggedInUser");
    }

    // Registration logic
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("regUsername").value;
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;

            let user_records = JSON.parse(localStorage.getItem("users")) || [];

            // Sprawdź, czy username lub email już istnieje
            const usernameExists = user_records.some(v => v.username === username);
            const emailExists = user_records.some(v => v.email === email);

            if (usernameExists) {
                alert("Username is already taken.");
            } else if (emailExists) {
                alert("Email is already registered.");
            } else {
                user_records.push({
                    username: username,
                    email: email,
                    password: password,
                    passwords: {}
                });
                localStorage.setItem("users", JSON.stringify(user_records));
                alert(`Registration successful for ${username}!`);
                window.location.href = "index.html";
            }
        });
    }


    // Check Passwords logic
    const showPasswordButton = document.getElementById("showPasswordButton");
    const siteSelectInput = document.getElementById("siteSelectInput");
    const checkPasswordInput = document.getElementById("checkPassword");
    const messageDiv = document.getElementById("message");

    showPasswordButton?.addEventListener("click", function() {
        const selectedSite = siteSelectInput.value;
        const currentUser = getCurrentUser();

        let user_records = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = user_records.findIndex(user => user.username === currentUser);

        if (userIndex !== -1) {
            const user = user_records[userIndex];
            let passwords = user.passwords;
            let password = passwords[selectedSite];

            if (password) {
                checkPasswordInput.value = password;
                messageDiv.textContent = "";
            } else {
                checkPasswordInput.value = `No saved password for ${selectedSite}`;
            }
        } else {
            alert("Użytkownik nie znaleziony.");
        }
    });


    // Password generation logic
    const generateButton = document.getElementById("generateButton");
    const generatedPassword = document.getElementById("generatedPassword");
    const siteNameInput = document.getElementById("siteSelect");

    generateButton?.addEventListener("click", function() {
        const length = parseInt(document.getElementById("passwordLength").value);
        const siteName = siteNameInput.value;

        if (length >= 6 && length <= 24) {
            const password = generateStrongPassword(length);
            generatedPassword.value = password;

            const currentUser = getCurrentUser();
            if (currentUser) {
                let user_records = JSON.parse(localStorage.getItem("users")) || [];
                const userIndex = user_records.findIndex(user => user.username === currentUser);
                const existingPassword = userIndex !== -1 ? user_records[userIndex].passwords[siteName] : null;

                // Confirm saving the generated password if it already exists
                if (existingPassword) {
                    const confirmSave = confirm(`A password for ${siteName} already exists.\nDo you want to overwrite it?\n\nNew Password: ${password}`);
                    
                    if (confirmSave) {
                        saveGeneratedPassword(currentUser, siteName, password);
                        alert(`Password for ${siteName} updated successfully!`);
                    }
                } else {
                    // Save without confirmation if there was no existing password
                    saveGeneratedPassword(currentUser, siteName, password);
                    alert(`Password for ${siteName} saved successfully!`);
                }
            } else {
                alert("No user is logged in.");
            }
        } else {
            alert("Please enter a valid password length (6-24).");
        }
    });

    // Function to save the generated password to the current user's account
    function saveGeneratedPassword(username, site, password) {
        let user_records = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = user_records.findIndex(user => user.username === username);
        
        if (userIndex !== -1) {
            user_records[userIndex].passwords[site] = password;
            localStorage.setItem("users", JSON.stringify(user_records));
        }
    }

    // Function to generate strong password
    function generateStrongPassword(length) {
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const allChars = lowerCase + upperCase + numbers + specialChars;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        return password;
    }

    // Changing account's password logic
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        const changePasswordMessage = document.getElementById("changePasswordMessage");
        const currentUser = getCurrentUser();

        if (currentUser) {
            changePasswordMessage.textContent = `Change password for ${currentUser}`;
        }

        changePasswordForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const oldPassword = document.getElementById("oldPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            let user_records = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = user_records.findIndex(user => user.username === currentUser);

            if (userIndex !== -1) {
                if (user_records[userIndex].password === oldPassword) {
                    if (newPassword === confirmPassword) {
                        user_records[userIndex].password = newPassword;
                        localStorage.setItem("users", JSON.stringify(user_records));
                        alert("Password changed successfully!\nPlease, login again.");
                        localStorage.removeItem("loggedInUser");
                        window.location.href = "index.html";
                    } else {
                        alert("New passwords do not match.");
                    }
                } else {
                    alert("Current password is incorrect.");
                }
            } else {
                alert("User not found.");
            }
        });
    }

    // Loading user list for manage accounts
    function loadUsernames() {
        const userList = document.getElementById("userList");
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.length === 0) {
            userList.innerHTML = "<li>No users found.</li>";
            return;
        }

        users.forEach(user => {
            const listItem = document.createElement("li");
            listItem.textContent = user.username;
            userList.appendChild(listItem);
        });
    }

    // Navigation logic
    document.getElementById("backMenu")?.addEventListener("click", function() {
        window.location.href = "dashboard.html";
    });

    document.getElementById("backAdminMenu")?.addEventListener("click", function() {
        window.location.href = "admin.html";
    });

    document.getElementById("generatePassword")?.addEventListener("click", function() {
        window.location.href = "generatePassword.html";
    });

    document.getElementById("checkPasswords")?.addEventListener("click", function() {
        window.location.href = "checkPasswords.html";
    });

    document.getElementById("manageLogin")?.addEventListener("click", function() {
        window.location.href = "manageLogin.html";
    });

    document.getElementById("manageRegAccounts")?.addEventListener("click", function() {
        window.location.href = "manageAccounts.html";
    });

    document.getElementById("logout")?.addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully");
        window.location.href = "index.html";
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    const passwordList = document.getElementById("passwordList");

    searchInput?.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const items = passwordList.getElementsByTagName("li");

        Array.from(items).forEach(item => {
            const siteName = item.textContent.toLowerCase();
            item.style.display = siteName.includes(searchTerm) ? "" : "none";
        });
    });

    // Load passwords when the page is loaded
    loadPasswords();
    

});

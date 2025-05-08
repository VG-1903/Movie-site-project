// async function login() {
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     const response = await fetch("http://localhost:3000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();
//     if (response.ok) {
//         localStorage.setItem("token", data.token);
//         window.location.href = "dashboard.html";  // Redirect to dashboard
//     } else {
//         document.getElementById("login-message").innerText = data.msg;
//     }
// }

// async function register() {
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;

//     const response = await fetch("http://localhost:3000/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();
//     if (response.ok) {
//         document.getElementById("register-message").innerText = "Registration successful! Please log in.";
//     } else {
//         document.getElementById("register-message").innerText = data.msg;
//     }
// }

// function showRegister() {
//     document.querySelector(".login-container").style.display = "none";
//     document.querySelector(".register-container").style.display = "block";
// }

// function showLogin() {
//     document.querySelector(".login-container").style.display = "block";
//     document.querySelector(".register-container").style.display = "none";
// }











// this is the oneeeeeeeeeeeeeeeeeee

// DOM Elements
// const loginForm = document.getElementById('login-form');
// const registerForm = document.getElementById('register-form');
// const loginToggle = document.getElementById('login-toggle');
// const registerToggle = document.getElementById('register-toggle');
// const showRegister = document.getElementById('show-register');
// const showLogin = document.getElementById('show-login');

// Show Register Form
// function showRegisterForm() {
//     loginForm.style.display = 'none';
//     registerForm.style.display = 'flex';
//     loginToggle.classList.remove('active');
//     registerToggle.classList.add('active');
// }

// Show Login Form
// function showLoginForm() {
//     registerForm.style.display = 'none';
//     loginForm.style.display = 'flex';
//     registerToggle.classList.remove('active');
//     loginToggle.classList.add('active');
// }

// Event Listeners for Form Toggling
// loginToggle.addEventListener('click', showLoginForm);
// registerToggle.addEventListener('click', showRegisterForm);
// showRegister.addEventListener('click', showRegisterForm);
// showLogin.addEventListener('click', showLoginForm);






















// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Show Register Form
function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
    loginToggle.classList.remove('active');
    registerToggle.classList.add('active');
}

// Show Login Form
function showLoginForm() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
    registerToggle.classList.remove('active');
    loginToggle.classList.add('active');
}

// Handle Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.style.display = 'none';
    });
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Basic validation
    let hasError = false;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        hasError = true;
    }
    
    if (!password || password.length < 8) {
        document.getElementById('login-password-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            document.getElementById('login-error').textContent = data.msg || 'Login failed';
            document.getElementById('login-error').style.display = 'block';
            return;
        }
        
        // Store the token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('login-error').textContent = 'Connection error. Please try again.';
        document.getElementById('login-error').style.display = 'block';
    }
});

// Handle Register Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.style.display = 'none';
    });
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Basic validation
    let hasError = false;
    
    if (!name) {
        document.getElementById('register-name-error').style.display = 'block';
        hasError = true;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('register-email-error').style.display = 'block';
        hasError = true;
    }
    
    if (!password || password.length < 8) {
        document.getElementById('register-password-error').style.display = 'block';
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('register-confirm-error').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name,
                email, 
                password 
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            document.getElementById('register-error').textContent = data.msg || 'Registration failed';
            document.getElementById('register-error').style.display = 'block';
            return;
        }
        
        // Show success and switch to login form
        alert('Registration successful! Please log in.');
        showLoginForm();
        
    } catch (error) {
        console.error('Registration error:', error);
        document.getElementById('register-error').textContent = 'Connection error. Please try again.';
        document.getElementById('register-error').style.display = 'block';
    }
});

// Event Listeners for Form Toggling
loginToggle.addEventListener('click', showLoginForm);
registerToggle.addEventListener('click', showRegisterForm);
showRegister.addEventListener('click', showRegisterForm);
showLogin.addEventListener('click', showLoginForm);
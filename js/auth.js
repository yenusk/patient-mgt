// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    
    // Toggle between login and register forms
    if (showRegister && showLogin) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginBox.classList.add('hidden');
            registerBox.classList.remove('hidden');
        });
        
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        });
    }
    
    // Check URL for register parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('register') === 'true' && loginBox && registerBox) {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!username || !password) {
                alert('Please enter both username and password');
                return;
            }
            
            // In a real app, you would make an API call here
            console.log('Login attempt with:', username, password);
            
            // For demo purposes, redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const staffId = document.getElementById('reg-staff-id').value;
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;
            
            // Validation
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            if (!name || !email || !staffId || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would make an API call here
            console.log('Registration attempt:', { name, email, staffId, password });
            
            // For demo purposes, show success and switch to login
            alert('Registration successful! Please login with your new credentials.');
            registerBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
            registerForm.reset();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // In a real app, you would clear session/token here
            window.location.href = 'login.html';
        });
    }
});
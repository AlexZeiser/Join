let inputPassword = document.querySelector('input[type="password"]');
let alertMessage = document.getElementById('alert-message');
let buttonsPasswordVisibility = document.querySelectorAll('div[class="password-visibility"]')
let loginForm = document.getElementById('login-form');


/**
 * Show on the login the password false alert message
 */
function showAlertMessage() {
    inputPassword.classList.add('input-danger');
    alertMessage.style.display = '';
}

/**
 * Check if the user have left the password input empty or not
 * @returns {boolean} Return true if password input have min. 1 value and return false if input are empty
 */
function isPasswordNotEmtpy() {
    if (inputPassword.value.length < 1) {
        showAlertMessage();
        return false;
    }

    return true;
}

/**
 * Show password in the password input
 */
function showButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = '';
    }
}

/**
 * Hide password in the password input
 */
function hideButtonPasswordVisible() {
    for (let i = 0; i < buttonsPasswordVisibility.length; i++) {
        let buttonPasswordVisibility = buttonsPasswordVisibility[i];
        buttonPasswordVisibility.style.display = 'none';
    }
}

/**
 * Change the icon of the password input
 * @param {string} iconPath Icon path example: /img/image.svg
 */
function changePasswordInputIcon(iconPath) {
    inputPassword.style.background = `url(${iconPath}) no-repeat`;
    inputPassword.style.backgroundPosition = 'right 21px top 50%';
}

/**
 * Check every keypress on password input what type of input currently is to show the right button
 */
function checkInputPassword() {
    if (inputPassword.value) {
        if (inputPassword.type == 'password') {
            changePasswordInputIcon('/img/visibility_off.png');
        } else if (inputPassword.type == 'text') {
            changePasswordInputIcon('/img/visibility.png');
        }
        showButtonPasswordVisible();
    } else {
        changePasswordInputIcon('/img/lock.png');
        hideButtonPasswordVisible();
    }
}

/**
 * Switch function to switch between hide and show password icon
 */
function hidePassword() {
    if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
        changePasswordInputIcon('/img/visibility.png');
    } else if (inputPassword.type == 'text') {
        inputPassword.type = 'password';
        changePasswordInputIcon('/img/visibility_off.png');
    }
    inputPassword.focus();
}

/**
 * Login the user and check the login details if it match
 * @returns {boolean} If login details match it return true and if not false
 */
function login() {
    let users = [];
    let foundUser = false;
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (!isPasswordNotEmtpy()) {
        return false;
    }

    const usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        users = JSON.parse(usersObjectString);
    }

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (email.value == user.email && password.value == user.password) {
            user.isLogin = true;
            foundUser = true;
        }
    }

    if (foundUser) {
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    showAlertMessage();
    return false;
}

/**
 * Login the user as guest and skip the login details check
 */
function loginGuest() {
    const usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        let users = JSON.parse(usersObjectString);
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.name == 'Guest') {
                user.isLogin = true;
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
        loginForm.submit();
    }
}
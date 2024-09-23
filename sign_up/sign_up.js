let dialogMessage = document.getElementById('dialog-message');
let validationPassword = document.querySelector('div[class="validation-password"]');
let buttonSignup = document.getElementById('button-sign-up');
let allInputs = document.getElementsByClassName('input-field');
let checkboxAccept = document.getElementById('accept');
let signUpForm = document.getElementById('sign-up-form');
let inputPasswords = document.getElementsByClassName('password-visibility');
let name = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');

/**
 * Check if the password and password-repeat input match
 * @returns {boolean} Return true if the passwords match and return false if not
 */
function checkPasswordMatch() {
    if (signUpForm['password'].value != signUpForm['confirm-password'].value) {
        validationPassword.style.display = '';
        signUpForm['confirm-password'].classList.add('input-danger');
        return false;
    }
    dialogMessage.style.display = '';
    setTimeout(function () {
        signUpForm.submit();
    }, 1000);
    return false;
}

/**
 * Signup the user, save in local storage and redirect them to the login page
 */
function signup() {
    let users = [];
    let usersObjectString = localStorage.getItem('users');
    if (usersObjectString) {
        users = JSON.parse(usersObjectString);
    }

    if (!buttonSignup.hasAttribute('disabled')) {
        const user = {
            'name': name.value,
            'email': email.value,
            'password': password.value,
            'isLogin': false,
            'contacts': [],
            'tasks': []
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Check if all inputs are filled out if not a alert message will be showed
 */
function checkIsInputFilled() {
    if (checkboxAccept.checked) {
        buttonSignup.removeAttribute('disabled');
    } else {
        buttonSignup.setAttribute('disabled', '');

    }
    for (let i = 0; i < allInputs.length; i++) {
        let input = allInputs[i];
        if (!input.value) {
            buttonSignup.setAttribute('disabled', '');
            break
        }
    }
}
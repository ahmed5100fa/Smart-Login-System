"use strict";

let usernameInput = document.querySelector('#usernameInput');
let emailInput = document.querySelector('#emailInput');
let passwordInput = document.querySelector('#passwordInput');
let btn = document.querySelector('button');

let usersList = JSON.parse(localStorage.getItem('userRegister')) || [];

function addUser() {
    let user = {
        name: usernameInput.value,
        email: emailInput.value,
        pass: passwordInput.value
    };

    let emailExists = usersList.some(u => u.email === user.email);
    if (emailExists) {
        alert('This email is already registered!');   
        return;
    } else {
        usersList.push(user);
        localStorage.setItem('userRegister', JSON.stringify(usersList));
        clear();
        window.location.href = 'index.html';
    }
}

function clear() {
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

// عند الكتابة يتم التحقق بشكل بصري
function validation(element) {
    let rejex = {
        usernameInput: /^[A-Z][a-z1-9_]{5,20}$/, 
        emailInput: /^[A-Za-z0-9]{5,15}@(gmail|yahoo)\.(com|net|org)$/, 
        passwordInput: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    };

    let isValid = false;

    if (element.id === 'emailInput') {
        let emailExists = usersList.some(u => u.email === element.value);
        if (emailExists) {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            element.parentElement.nextElementSibling.classList.remove("d-none");
            element.parentElement.nextElementSibling.textContent = "This email is already registered!";
            isValid = false;
        } else if (rejex[element.id]?.test(element.value)) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            element.parentElement.nextElementSibling.classList.add("d-none");
            isValid = true;
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            element.parentElement.nextElementSibling.classList.remove("d-none");
            isValid = false;
        }
    } else if (rejex[element.id]?.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.parentElement.nextElementSibling.classList.add("d-none");
        isValid = true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.parentElement.nextElementSibling.classList.remove("d-none");
        isValid = false;
    }

    return isValid;
}

btn.addEventListener('click', function () {
    // تحقق من صحة جميع الحقول
    let isValidUsername = validation(usernameInput);
    let isValidEmail = validation(emailInput);
    let isValidPassword = validation(passwordInput);

    // إذا كانت كل الحقول صالحة
    if (isValidUsername && isValidEmail && isValidPassword) {
        addUser();
    } else {
        alert('Please correct the invalid fields and try again.');
    }
});

usernameInput.addEventListener("input", (e) => validation(e.currentTarget));
emailInput.addEventListener("input", (e) => validation(e.currentTarget));
passwordInput.addEventListener("input", (e) => validation(e.currentTarget));

new FinisherHeader({
    "count": 100,
    "size": { "min": 1, "max": 4, "pulse": 0 },
    "speed": { "x": { "min": 0, "max": 0.4 }, "y": { "min": 0, "max": 0.6 } },
    "colors": { "background": "#201e30", "particles": ["#fbfcca", "#d7f3fe", "#ffd0a7"] },
    "blending": "overlay",
    "opacity": { "center": 1, "edge": 0.65 },
    "skew": 0,
    "shapes": ["s"]
});

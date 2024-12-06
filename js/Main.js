let emailInput = document.querySelector('#emailInput');
let passwordInput = document.querySelector('#passwordInput');
let btn = document.querySelector('button');
let alert = document.querySelector('.alert');

let usersList;

if (localStorage.getItem('userRegister')) {
    usersList = JSON.parse(localStorage.getItem('userRegister'));
} else {
    usersList = [];
}

function checkLogin() {
    let isExist = false;
    let loggedInUser = null;
    
    for (let i = 0; i < usersList.length; i++) {
        if (emailInput.value === usersList[i].email && passwordInput.value === usersList[i].pass) {
            isExist = true;
            loggedInUser = usersList[i];
            break;
        }
    }

    if (isExist && loggedInUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        window.location.href = 'dashboard.html';
    } else {
        // alert('Invalid email or password. Please try again.');
        alert.classList.remove('d-none');
    }
}

btn.addEventListener('click', function() {
    checkLogin(); 
});



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

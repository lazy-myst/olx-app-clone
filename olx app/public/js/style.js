function emailBtn() {
    document.getElementById('form').style.display = 'none'
    document.getElementById('email-form').style.display = 'block'
}

function loginBtn() {
    document.getElementById('login-card').style.display = 'block'
}


function postBtn() {
    const loggedIn = document.getElementById('logged-in')
    if (loggedIn.style.display == 'flex') {
        window.location.href = "./views/addform.html"
    }
    else {
        document.getElementById('login-card').style.display = 'block'
    }
}


function loginCard(event) {
    if (event.target == loginCard) {
        document.getElementById('login-card').style.display = 'none'
        document.getElementById('email-form').style.display = 'none'
        document.getElementById('form').style.display = 'block'
        document.getElementById('register-form').style.display = 'none'
        emptyInputFields()
    }
}
function closeCard() {
    document.getElementById('login-card').style.display = 'none'
    document.getElementById('email-form').style.display = 'none'
    document.getElementById('form').style.display = 'block'
    document.getElementById('register-form').style.display = 'none'
    emptyInputFields()
}


function signUpBtn() {
    document.getElementById('register-form').style.display = 'block'
    document.getElementById('email-form').style.display = 'none'
}

function backwardbtn() {
    document.getElementById('form').style.display = 'block'
    document.getElementById('email-form').style.display = 'none'
}


function emptyInputFields() {
    document.getElementById('email').value = ''
    document.getElementById('password').value = ''
    document.getElementById('username-registered').value = ''
    document.getElementById('age-registered').value = ''
    document.getElementById('email-registered').value = ''
    document.getElementById('password-registered').value = ''
    document.getElementById('signup-error').style.display = 'none'
    document.getElementById('login-error').style.display = 'none'
}
function dropDown(){
    document.getElementById('drop-down').classList.toggle('show')
    document.getElementById('user-dropdown').classList.toggle('rotate')
}

// function goToMyAds(){
//     if(window.location.href="/views/myads.html"){
//         return
//     }else{
//         window.location.href="./views/myads.html"
//     }
    
// }
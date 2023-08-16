import {
    addPostToDb, uploadImageToDb, loginWithFirebase,
    signUpWithFirebase, logoutWithFirebase, checkLoginUser
} from '../config/firebase.js'

checkLoginUser()

// identifyUser()

// async function identifyUser() {
//     checkLoginUser()
// }
//let userDetailsCurrent;

function setUsername(currentUser) {
    document.getElementById('user-username').innerHTML = currentUser[0].registeredUsername
}


window.login = async function () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    try {
        await loginWithFirebase(email, password)
        //const currentUserDetails = await getUserDetials(userDetails.user.uid)
        // userDetailsCurrent = currentUserDetails
        closeCard()
        document.getElementById('login-btn-container').style.display = 'none'
        document.getElementById('logged-in').style.display = 'flex'
        // document.getElementById('user-username').innerHTML = currentUserDetails[0].registeredUsername
    } catch (e) {
        document.getElementById('login-error').style.display = 'flex'
        const error = document.getElementById('lg-error')
        error.innerHTML = e.message
    }
}

window.logout = async function () {
    try {
        await logoutWithFirebase()
        document.getElementById('drop-down').classList.remove('show')
        document.getElementById('user-dropdown').classList.remove('rotate')
    } catch (e) {
        console.log('error---->', e.message)
    }
}

window.signUp = async function () {
    const registeredUsername = document.getElementById('username-registered').value
    const registeredAge = document.getElementById('age-registered').value
    const registeredEmail = document.getElementById('email-registered').value
    const registeredPassword = document.getElementById('password-registered').value
    try {
        await signUpWithFirebase({ registeredUsername, registeredAge, registeredEmail, registeredPassword })
        closeCard()
        document.getElementById('login-btn-container').style.display = 'none'
        document.getElementById('logged-in').style.display = 'flex'
    } catch (e) {
        document.getElementById('signup-error').style.display = 'flex'
        const error = document.getElementById('error')
        error.innerHTML = e.message
    }
}



window.getUserPost = async function () {
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const image = document.getElementById('image').files[0]

    try {
        const imageURL = await uploadImageToDb(image)
        await addPostToDb(title, description, price, imageURL)
        window.location.href = "../index.html"
    } catch (e) {
        console.log(e.message)
    }

}

// async function getAds() {
//     const posts = await getPostsFromDb()
//     const postsElem = document.getElementById('ads')

//     for (let i of posts) {
//         postsElem.innerHTML += `<li onclick="goToDetailPage('${i.id}')" class="card">
//         <div class="ad-picture-wrapper">
//             <div class="picture">
//                 <img src=${i.imageURL} alt="">
//             </div>
//         </div>
//         <div class="details">
//             <h2 class="ad-title">${i.title}</h2>
//             <p class="ad-price">Rs ${i.price}</p>
//         </div>
//         <div class="ad-location">
//             <p>Liyari, NYC, USA : Just now</p>
//         </div>
//     </li>`
//     }
// };




// window.getMyAds = async function () {
//         if (window.location.href = "/views/myads.html") {
//             return
//         } else {
//             window.location.href = "./views/myads.html"
//         }

//     const posts = await getMyPostsFromDb(userDetailsCurrent[0].uid)
//     console.log(posts)
//     const postsElem = document.getElementById('my-ads')

//     for (let i of posts) {
//         postsElem.innerHTML += `<li onclick="goToDetailPage('${i.id}')" class="card">
//         <div class="ad-picture-wrapper">
//             <div class="picture">
//                 <img src=${i.imageURL} alt="">
//             </div>
//         </div>
//         <div class="details">
//             <h2 class="ad-title">${i.title}</h2>
//             <p class="ad-price">Rs ${i.price}</p>
//         </div>
//         <div class="ad-location">
//             <p>Liyari, NYC, USA : Just now</p>
//         </div>
//     </li>`
//     }
// };


window.goToDetailPage = async function (id) {
    location.href = `views/detail.html?id=${id}`
}

function userLoggedIn() {
    document.getElementById('login-btn-container').style.display = 'none'
    document.getElementById('logged-in').style.display = 'flex'
}

function userNotLoggedIn() {
    document.getElementById('login-btn-container').style.display = 'block'
    document.getElementById('logged-in').style.display = 'none'
}

export {
    userLoggedIn,
    userNotLoggedIn,
    setUsername
}
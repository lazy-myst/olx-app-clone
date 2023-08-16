import { getMyPostsFromDb } from '../config/firebase.js'



getMyAds()



async function getMyAds() {
    const posts = await getMyPostsFromDb()
    const postsElem = document.getElementById('my-ads')

    for (let i of posts) {
        postsElem.innerHTML += `<li onclick="goToDetailPage('${i.id}')" class="card">
        <div class="ad-picture-wrapper">
            <div class="picture">
                <img src=${i.imageURL} alt="">
            </div>
        </div>
        <div class="details">
            <h2 class="ad-title">${i.title}</h2>
            <p class="ad-price">Rs ${i.price}</p>
        </div>
        <div class="ad-location">
            <p>Liyari, NYC, USA : Just now</p>
        </div>
    </li>`
    }
};
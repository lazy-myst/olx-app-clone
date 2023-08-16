import { getCurrenPost, getSellerDetails, getChatRoom, createChatRoom } from '../config/firebase.js'

const postId = window.location.search.split('=')
const currentPostId = postId[1]

let currentSellerDetails;

getPostDetails()
async function getPostDetails() {
    const currentPost = await getCurrenPost(currentPostId)
    document.getElementById('detail-image').setAttribute('src', currentPost[0].imageURL)
    document.getElementById('main-price').innerHTML = `Rs ${currentPost[0].price}`
    const sellerDetails = await getSellerDetails(currentPost[0].userUID)
    currentSellerDetails = sellerDetails[0]
    document.getElementById('seller-username').innerHTML = sellerDetails[0].registeredUsername
    document.getElementById('title').innerHTML = currentPost[0].title
    document.getElementById('price').innerHTML = currentPost[0].price
    document.getElementById('description').innerHTML = currentPost[0].description

}

window.initiateChat = async function () {
    let chatRoom = await getChatRoom(currentSellerDetails.uid)
    if (!chatRoom) {
        chatRoom = await createChatRoom(currentSellerDetails.uid)
        let chatId = chatRoom._id
        location.href = `chat.html?id=${chatId}`
    }
    else {
        let chatId = chatRoom._id
        location.href = `chat.html?id=${chatId}`
    }
}



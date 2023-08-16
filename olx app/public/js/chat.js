import { sendMessageToDb, getRealtimeChat } from '../config/firebase.js'




const chatId = window.location.search.split('=')
const currentChatId = chatId[1]

// let currentChatDetails;

// getChatDetails()
// async function getChatDetails() {
//     const currentChat = await getCurrentChat(currentChatId)

// }

window.sendMessage = async function () {
    const message = document.getElementById('message')
    await sendMessageToDb(message.value, currentChatId)
    message.value = ""
}
getChats()
function getChats() {
    getRealtimeChat(currentChatId)
}
// getChats()
// function getChats() {
//     getRealtimeChat(currentChatId)
// }
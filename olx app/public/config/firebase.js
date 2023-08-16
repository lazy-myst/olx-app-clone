// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, query, where, getDoc, getDocs, serverTimestamp, onSnapshot, orderBy, setDoc, doc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { userLoggedIn, userNotLoggedIn, setUsername } from "../js/app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV30ruD_vr7S_gs6ekkiwUZOB53ue5-W4",
  authDomain: "olx-app-ammad.firebaseapp.com",
  projectId: "olx-app-ammad",
  storageBucket: "olx-app-ammad.appspot.com",
  messagingSenderId: "336239006945",
  appId: "1:336239006945:web:958871bd85d8130a1853a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

function checkLoginUser() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userLoggedIn()
      const currentUser = await getUserDetials(user.uid)
      setUsername(currentUser)
    }
    else {
      userNotLoggedIn()
    }
  });
};
// function checkLoginUser() {

// };


// function setUserName(){

//   auth.currentUser.displayName
// }

async function getUserDetials(uid) {
  const currentUser = []

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    currentUser.push(docSnap.data());
  } else {
    console.log('No Such User')
  }
  return currentUser

}

async function signUpWithFirebase(userInfo) {
  const { registeredEmail, registeredPassword } = userInfo
  const userCredential = await createUserWithEmailAndPassword(auth, registeredEmail, registeredPassword)
  await addUsertoDatabase(userInfo, userCredential.user.uid)
}

function loginWithFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

function logoutWithFirebase() {
  userNotLoggedIn()
  return signOut(auth)
}


function addUsertoDatabase(userInfo, uid) {
  const { registeredUsername, registeredAge, registeredEmail } = userInfo
  return setDoc(doc(db, "users", uid), { registeredUsername, registeredAge, registeredEmail, uid })
}

function addPostToDb(title, description, price, imageURL) {
  const userUID = auth.currentUser.uid
  return addDoc(collection(db, "posts"), { title, description, price, imageURL, userUID })
}

async function uploadImageToDb(image) {
  const imageId = Date.now()
  const storageReference = ref(storage, `images/${image.name + imageId}`)
  const snapshot = await uploadBytes(storageReference, image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}


async function getPostsFromDb() {
  const ads = []
  const querySnapshot = await getDocs(collection(db, "posts"))
  querySnapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() })
  })
  return ads
}





// async function getMyAds() {
//     const posts = await getMyPostsFromDb()
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


// async function getMyPostsFromDb(uid) {
//   const ads = []
//   const q = query(collection(db, "posts"), where('userUID', "==", uid));
//   const querySnapshot = await getDocs(q)
//   querySnapshot.forEach((doc) => {
//     ads.push({ id: doc.id, ...doc.data() })
//   });
//   return ads

// }





async function getCurrenPost(postId) {
  const currentPostDetails = []

  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    currentPostDetails.push(docSnap.data());
  } else {

  }
  return currentPostDetails
}

async function getSellerDetails(uid) {
  const sellerDetails = []

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    sellerDetails.push(docSnap.data());
  } else {
    console.log('No Such User')
  }
  return sellerDetails
}


async function getChatRoom(adUserId) {
  const userId = auth.currentUser.uid

  const q = query(collection(db, "chatrooms"),
    where(`users.${userId}`, "==", true),
    where(`users.${adUserId}`, "==", true))

  const querySnapshot = await getDocs(q)

  let room;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    room = { _id: doc.id, ...doc.data() }
  })
  return room
}

async function createChatRoom(adUserId) {
  const userId = auth.currentUser.uid
  const chatDetails = {
    users: {
      [userId]: true,
      [adUserId]: true
    },
    createdAt: Date.now()
  }
  return addDoc(collection(db, "chatrooms"), chatDetails)
}

// async function getCurrentChat(chatId) {
//   const currentChatDetails = []

//   const docRef = doc(db, "chatrooms", chatId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     currentChatDetails.push(docSnap.data());
//   } else {

//   }
//   return currentChatDetails
// }


function sendMessageToDb(text, roomId) {
  const message = { text, createdAt: serverTimestamp(), userId: auth.currentUser.uid }
  return addDoc(collection(db, "chatrooms", roomId, "messages"), message)
}

function getRealtimeChat(chatRoomId) {

  const q = query(collection(db, "chatrooms", chatRoomId, "messages"), orderBy("createdAt", "desc"))

  const message = onSnapshot(q, (querySnapshot) => {
    const chats = []

    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() })
    });
    const chatElem = document.getElementById('chat')
    chatElem.innerHTML = ''
    for (let i of chats) {
      if (i.userId == auth.currentUser.uid) {
        chatElem.innerHTML += `<div class="my-message-styling">
      <pre>${i.text}</pre>
  </div>`
      } else {
        chatElem.innerHTML += `<div class="user-message-styling">
      <pre>${i.text}</pre>
  </div>`
      }

    }
  })
};





export {
  loginWithFirebase,
  signUpWithFirebase,
  addPostToDb,
  getPostsFromDb,
  uploadImageToDb,
  logoutWithFirebase,
  getCurrenPost,
  checkLoginUser,
  getSellerDetails,
  getChatRoom,
  createChatRoom,
  sendMessageToDb,
  getRealtimeChat
}

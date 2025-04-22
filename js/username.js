import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6XasAWG8xn7ZAZa05NVwibUV5E4nSxGA",
  authDomain: "carteek-dc466.firebaseapp.com",
  projectId: "carteek-dc466",
  storageBucket: "carteek-dc466.firebasestorage.app",
  messagingSenderId: "825111214059",
  appId: "1:825111214059:web:f240564fbcd7cbfc42cbae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const username = params.get("u");

if (!username) {
  document.getElementById("cardName").textContent = "Username not found.";
} else {
  loadUser(username);
}

async function loadUser(username) {
  const usernameRef = doc(db, "usernames", username.toLowerCase());
  const usernameSnap = await getDoc(usernameRef);

  if (usernameSnap.exists()) {
    const { uid } = usernameSnap.data();
    const cardRef = doc(db, "cards", uid);
    const cardSnap = await getDoc(cardRef);
    if (cardSnap.exists()) {
      const data = cardSnap.data();
      document.getElementById("cardName").textContent = data.name;
      document.getElementById("cardTitle").textContent = data.title;
      document.getElementById("cardCompany").textContent = data.company;
      document.getElementById("cardBio").textContent = data.bio;

      await updateDoc(cardRef, { views: increment(1) });
    } else {
      document.getElementById("cardName").textContent = "User card not found.";
    }
  } else {
    document.getElementById("cardName").textContent = "Username not registered.";
  }
}

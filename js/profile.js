import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

// Parse UID or username from query string (?id=xxxxx)
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

if (!userId) {
  document.getElementById("cardName").textContent = "Profile not found.";
} else {
  loadProfile(userId);
}

async function loadProfile(id) {
  const docRef = doc(db, "cards", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("cardName").textContent = data.name;
    document.getElementById("cardTitle").textContent = data.title;
    document.getElementById("cardCompany").textContent = data.company;
    document.getElementById("cardBio").textContent = data.bio;
  } else {
    document.getElementById("cardName").textContent = "Profile not found.";
  }
}

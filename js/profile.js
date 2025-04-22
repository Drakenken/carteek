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
const uid = params.get("id");

if (!uid) {
  document.getElementById("cardName").textContent = "User not found.";
} else {
  load(uid);
}

async function load(id) {
  const ref = doc(db, "cards", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("cardName").textContent = data.name;
    document.getElementById("cardTitle").textContent = data.title;
    document.getElementById("cardCompany").textContent = data.company;
    document.getElementById("cardBio").textContent = data.bio;

    await updateDoc(ref, { views: increment(1) });
  } else {
    document.getElementById("cardName").textContent = "Card not found.";
  }
}

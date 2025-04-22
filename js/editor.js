import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6XasAWG8xn7ZAZa05NVwibUV5E4nSxGA",
  authDomain: "carteek-dc466.firebaseapp.com",
  projectId: "carteek-dc466",
  storageBucket: "carteek-dc466.firebasestorage.app",
  messagingSenderId: "825111214059",
  appId: "1:825111214059:web:f240564fbcd7cbfc42cbae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userId = null;

onAuthStateChanged(auth, user => {
  if (user) userId = user.uid;
  else window.location.href = "auth.html";
});

function updatePreview() {
  document.getElementById("previewName").textContent = document.getElementById("fullName").value;
  document.getElementById("previewJob").textContent = document.getElementById("jobTitle").value;
  document.getElementById("previewCompany").textContent = document.getElementById("company").value;
  document.getElementById("previewBio").textContent = document.getElementById("bio").value;
}

["fullName", "jobTitle", "company", "bio"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

window.saveCard = async function() {
  if (!userId) return;

  const name = document.getElementById("fullName").value;
  const title = document.getElementById("jobTitle").value;
  const company = document.getElementById("company").value;
  const bio = document.getElementById("bio").value;
  const username = document.getElementById("username").value.toLowerCase().replace(/[^a-z0-9\-]/g, "");

  const cardData = { name, title, company, bio, username };

  await setDoc(doc(db, "cards", userId), cardData);
  if (username) {
    await setDoc(doc(db, "usernames", username), { uid: userId });
  }

  alert("Card saved!");
};

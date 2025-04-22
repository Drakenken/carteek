import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

let userId = null;

onAuthStateChanged(auth, async user => {
  if (!user) return window.location.href = "auth.html";
  userId = user.uid;

  const docRef = doc(db, "cards", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("previewName").textContent = data.name;
    document.getElementById("previewJob").textContent = data.title;
    document.getElementById("previewCompany").textContent = data.company;
    document.getElementById("previewBio").textContent = data.bio;
  } else {
    document.getElementById("previewName").textContent = "No data found.";
  }
});

window.logout = () => signOut(auth);

window.copyLink = () => {
  const url = `https://carteek.vercel.app/profile.html?id=${userId}`;
  navigator.clipboard.writeText(url)
    .then(() => alert("Link copied!"))
    .catch(() => alert("Failed to copy."));
};

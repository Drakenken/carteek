
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";

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
const auth = getAuth(app);

let userId = "";
let publicLink = "";

onAuthStateChanged(auth, async user => {
  if (!user) return window.location.href = "auth.html";
  userId = user.uid;

  const ref = doc(db, "cards", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("nameInput").value = data.name || "";
    document.getElementById("jobInput").value = data.title || "";
    document.getElementById("companyInput").value = data.company || "";
    document.getElementById("bioInput").value = data.bio || "";

    publicLink = `https://carteek.vercel.app/profile.html?id=${userId}`;
    document.getElementById("publicLink").value = publicLink;
    QRCode.toCanvas(document.getElementById("qrCanvas"), publicLink, { width: 200 });
  }
});

window.saveCard = async () => {
  const ref = doc(db, "cards", userId);
  const data = {
    name: document.getElementById("nameInput").value,
    title: document.getElementById("jobInput").value,
    company: document.getElementById("companyInput").value,
    bio: document.getElementById("bioInput").value,
  };
  await setDoc(ref, data, { merge: true });
  alert("Card saved successfully!");
};

window.copyLink = () => {
  navigator.clipboard.writeText(publicLink).then(() => alert("Link copied!"));
};

window.downloadQR = () => {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

window.shareWhatsApp = () => {
  window.open(`https://wa.me/?text=Check%20out%20my%20Carteel%20card:%20${encodeURIComponent(publicLink)}`);
};

window.shareEmail = () => {
  window.location.href = `mailto:?subject=My%20Digital%20Card&body=Here%20is%20my%20card:%20${encodeURIComponent(publicLink)}`;
};

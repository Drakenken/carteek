import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

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

window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(e => alert(e.message));
};

window.register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(e => alert(e.message));
};

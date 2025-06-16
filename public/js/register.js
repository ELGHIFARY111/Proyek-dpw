import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY5RLqhhp1IJJGdiKBQEOHTDoSPwvx8ZM",
  authDomain: "fussion-proyek-dpw.firebaseapp.com",
  projectId: "fussion-proyek-dpw",
  storageBucket: "fussion-proyek-dpw.firebasestorage.app",
  messagingSenderId: "301956673407",
  appId: "1:301956673407:web:5d2bf8749996c113cf344a",
  measurementId: "G-CBS2216ZFG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("register").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("user").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value;
  const passwordUlang = document.getElementById("pass-ulang").value;
  const role = document.getElementById("role").value;

  if (password !== passwordUlang) {
    alert("Password dan konfirmasi password tidak cocok.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data tambahan ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      username: username,
      role: role
    });

    alert("Registrasi berhasil. Silakan login.");
    window.location.href = "/login";
  } catch (error) {
    alert("Registrasi gagal: " + error.message);
  }
});

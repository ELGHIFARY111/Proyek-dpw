import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

const chatInput = document.getElementById("chat");
const sendButton = document.getElementById("kirim");
const chatArea = document.getElementById("chatArea");
const usernameDisplay = document.getElementById("usernameDisplay");
const maxCharMsg = 1500;
let currentUser = "";

async function fetchMessages() {
    try {
    const response = await fetch('/api/pesan');
    const messages = await response.json();

    let html = "";
    messages.forEach((msg, index) => {
        const isUser = msg.username === currentUser;
        const className = isUser ? "from-user" : "from-others";
        const marginTop = index === 0 ? "margin-top: 20px;" : "";
        html += `
        <div class="message ${className}" style="${marginTop}">
            <a style="font-size:10px;">${msg.username}:</a><br> ${msg.content}
        </div>`;
    });

    chatArea.innerHTML = html;
    chatArea.scrollTop = chatArea.scrollHeight;
    } catch (error) {
    console.error("Error fetching messages:", error);
    }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      currentUser = userDocSnap.data().username;
      usernameDisplay.textContent = `Welcome, ${currentUser}!`;
      usernameDisplay.style.display = "block";
      document.getElementById("nameSection").style.display = "none";
    } else {
      console.error("User data not found in Firestore.");
    }
  } else {
    window.location.href = "/login";
  }
});


sendButton.addEventListener("click", async function () {
    if (!currentUser) {
        alert("Silakan isi nama dulu sebelum mengirim pesan.");
        return;
    }

    const messageText = chatInput.value.trim();
    if (messageText.length > maxCharMsg) {
        alert("Pesan terlalu panjang!");
        return;
    }

    if (messageText) {
        try {
            const response = await fetch('/api/pesan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser,
                    content: messageText
                })
            });

            if (response.ok) {
                chatInput.value = "";
                fetchMessages();
            } else {
                const errorText = await response.text();
                console.error("Gagal mengirim pesan:", errorText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
});

chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
    event.preventDefault();
    sendButton.click();
    }
});

fetchMessages();
setInterval(fetchMessages, 3000);
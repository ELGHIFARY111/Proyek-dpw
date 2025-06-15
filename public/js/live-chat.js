const chatInput = document.getElementById("chat");
const sendButton = document.getElementById("kirim");
const chatArea = document.getElementById("chatArea");
const maxCharMsg = 1500;
let currentUser = null;

async function getCurrentUser() {
    try {
        const res = await fetch("/data/user");
        const data = await res.json();
        currentUser = data.username;
        fetchMessages();
    } catch (err) {
        console.error("Belum login");
        window.location.href = "/login";
    }
}
getCurrentUser();

async function fetchMessages() {
    try {
        const response = await fetch('/data/pesan');
        const messages = await response.json();

        let html = "";
        messages.forEach((msg, index) => {
            const isUser = msg.username.trim() === currentUser;
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

sendButton.addEventListener("click", async function () {
    const messageText = chatInput.value.trim();
    if (messageText) {
        try {
            const response = await fetch('/data/pesan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: currentUser,
                    content: messageText
                })
            });

            if (response.ok) {
                console.log("Pesan berhasil dikirim");
                chatInput.value = "";
                fetchMessages(); // Refresh setelah kirim
            } else {
                console.error("Gagal mengirim pesan");
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

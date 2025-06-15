const chatInput = document.getElementById("chat");
const sendButton = document.getElementById("kirim");
const chatArea = document.getElementById("chatArea");
const maxCharMsg = 1500;
let currentUser = null;

// Ambil user yang sedang login
async function getCurrentUser() {
    try {
        const res = await fetch("/api/user");
        const data = await res.json();
        currentUser = data.username;
        fetchMessages(); // ambil pesan setelah user diketahui
    } catch (err) {
        console.error("Belum login");
        window.location.href = "/login";
    }
}
getCurrentUser();

// Ambil semua pesan dan tampilkan
async function fetchMessages() {
    try {
        const response = await fetch('/api/pesan');
        const messages = await response.json();

        let html = "";
        messages.forEach((msg, index) => {
            const isUser = msg.nama.trim() === currentUser;
            const className = isUser ? "from-user" : "from-others";
            const marginTop = index === 0 ? "margin-top: 20px;" : "";

            html += `
                <div class="message ${className}" style="${marginTop}">
                    <a style="font-size:10px;">${msg.nama}:</a><br> ${msg.pesan}
                </div>`;
        });

        chatArea.innerHTML = html;
        chatArea.scrollTop = chatArea.scrollHeight; // scroll ke bawah
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Kirim pesan saat tombol klik
sendButton.addEventListener("click", async function () {
    const messageText = chatInput.value.trim();
    if (messageText) {
        if (messageText.length > maxCharMsg) {
            alert("Pesan terlalu panjang!");
            return;
        }

        try {
            const response = await fetch('/api/pesan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nama: currentUser,
                    pesan: messageText
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

// Kirim pesan dengan tombol Enter
chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

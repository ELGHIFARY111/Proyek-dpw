const chatInput = document.getElementById("chat");
const sendButton = document.getElementById("kirim");
const chatArea = document.getElementById("chatArea");
const maxCharMsg = 1500;
const maxCharsInput = 1500;
const headerHeight = 75;
let isFirstMessage = true;
function resizeTextarea() {
    chatInput.style.height = 'auto';
    chatInput.style.height = chatInput.scrollHeight + 'px'; 
}
function handleInput() {
    if (chatInput.value.length > maxCharsInput) {
        chatInput.value = chatInput.value.slice(0, maxCharsInput);
    }
    resizeTextarea();
}
function splitMessage(text) {
    const chunks = [];
    let start =0;
    while (start<text.length) {
        chunks.push(text.slice(start,start+maxCharMsg));
        start+=maxCharMsg;
    }
    return chunks;
}
sendButton.addEventListener("click", function() {
    const messageText = chatInput.value.trim();
    if (messageText) {
        const messageChunks = splitMessage(messageText);
        messageChunks.forEach(chunk => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.textContent = chunk;
            chatArea.appendChild(messageElement);
            if (isFirstMessage) {
                messageElement.style.marginTop = `${headerHeight}px`;
                isFirstMessage = false;
            }
        });
        chatInput.value = "";
        handleInput();
        chatArea.scrollTop = chatArea.scrollHeight;
    }
});
chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
    }
});

handleInput();


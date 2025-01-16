const socket = io();

// Elements
const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

// Handle form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;

    // Emit message to the server
    socket.emit('chatMessage', message);

    // Clear input field
    messageInput.value = '';
});

// Listen for incoming messages
socket.on('chatMessage', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.id.substring(0, 5)}: ${data.message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

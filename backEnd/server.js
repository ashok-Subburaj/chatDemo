const express = require('express');
const http = require('http');
const cors = require('cors'); // Import CORS
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://chat-demo-fvu7.vercel.app", // Replace with your client's URL
        methods: ["GET", "POST"],
    },
});

const PORT = 3000;

// Enable CORS
app.use(cors({
    origin: "https://chat-demo-fvu7.vercel.app", // Replace with your client's URL
}));

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', { id: socket.id, message: msg });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

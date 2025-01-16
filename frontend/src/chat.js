import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:3000"); // Connect to the backend

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on("chatMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off("chatMessage");
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Emit the message to the server
            socket.emit("chatMessage", message);
            setMessage(""); // Clear the input field
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.id.substring(0, 5)}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <form className="message-form" onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:7700", {
  withCredentials: true,
});

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

export default function SocketPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (messageData: Message) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && currentRoom && username) {
      socket.emit("sendMessageToRoom", {
        roomName: currentRoom,
        message,
        username,
      });
      setMessage("");
    }
  };

  const joinRoom = () => {
    if (roomName.trim() && username.trim()) {
      socket.emit("joinRoom", roomName);
      setCurrentRoom(roomName);
      setMessages([]);
    } else {
      alert("Please enter both room name and username");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-time Chat</h1>

      {!currentRoom && (
        <div className="space-y-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter Room Name"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={joinRoom}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Join Room
          </button>
        </div>
      )}

      {currentRoom && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Room: {currentRoom}</h2>
          <div className="border h-64 overflow-y-auto mb-2 p-2">
            {messages.map((msg, index) => (
              <div key={index} className="mb-1 p-1 bg-gray-100 rounded">
                <strong>{msg.username}</strong>: {msg.message}
                <small className="text-gray-500 ml-2 text-xs">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow p-2 border rounded-l"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white p-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

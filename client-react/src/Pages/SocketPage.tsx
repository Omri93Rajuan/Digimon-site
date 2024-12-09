import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:7700", {
  withCredentials: true,
});

interface Message {
  userName: string;
  message: string;
  timeStamp: string;
}

export default function SocketPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [userName, setUsername] = useState("");

  useEffect(() => {
    socket.on("loadMessages", (messageData: Message[]) => {
      setMessages(messageData);
    });

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && currentRoom && userName) {
      const timeStamp = Date.now().toLocaleString();
      socket.emit("sendMessageToRoom", {
        roomName: currentRoom,
        message,
        userName,
        timeStamp,
      });
      setMessage("");
    }
  };

  const joinRoom = () => {
    if (roomName.trim() && userName.trim()) {
      socket.emit("joinRoom", roomName);
      setCurrentRoom(roomName);
      setMessages([]); // Reset messages when switching rooms
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
            value={userName}
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
                <strong>{msg.userName}</strong>: {msg.message}
                <small className="text-gray-500 ml-2 text-xs">
                  {msg.timeStamp}
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

import { useState } from "react";
import axios from "axios"; // ✅ future API ke liye
export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  // ✅ Local dummy chats
  const chats = [
    { id: 1, name: "Dada mota", lastMsg: "Hey, kya haal hai. Kl college aaogi kya?", time: "10:30 AM" },
    { id: 2, name: "Raja bauna suar", lastMsg: "Kal milte hai,mujhe tumhari aankho me kuch dikhta h!", time: "9:15 AM" },
    { id: 3, name: "TV", lastMsg: "Photo sath lele?", time: "Yesterday" },
  ];

  // ✅ Local dummy messages
  const [chatMessages, setChatMessages] = useState({
    1: [
      { text: "Hey, kya haal hai. Kl college aaogi kya?", sender: "Dada mota", time: "10:30 AM" },
      { text: "nhi aaogi bhag ja yaha se", sender: "You", time: "10:32 AM" },
    ],
    2: [{ text: "Kal milte hai,mujhe tumhari aankho me kuch dikhta h!", sender: "Raja bauna suar", time: "9:15 AM" }],
    3: [
      { text: "Photo sath lele?", sender: "TV", time: "Yesterday" },
      { text: "Nhi", sender: "You", time: "Yesterday" },
    ],
  });

  // ✅ Future API call for fetching chats
  // useEffect(() => {
  //   axios.get("/api/chats").then(res => setChats(res.data)).catch(err => console.log(err));
  // }, []);

  // ✅ Future API call for fetching messages
  // useEffect(() => {
  //   if (!selectedChat) return;
  //   axios.get(`/api/chats/${selectedChat}/messages`)
  //     .then(res => setChatMessages(prev => ({ ...prev, [selectedChat]: res.data })))
  //     .catch(err => console.log(err));
  // }, [selectedChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

        // ✅ Future API call for sending message
    // axios.post(`/api/chats/${selectedChat}/messages`, newMsg).catch(err => console.log(err));


    setChatMessages({
      ...chatMessages,
      [selectedChat]: [...chatMessages[selectedChat], newMsg],
    });

    setMessage("");
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 font-bold text-xl border-b">Chats</div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                selectedChat === chat.id ? "bg-gray-200" : ""
              }`}
            >
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-gray-500 truncate">{chat.lastMsg}</div>
              <div className="text-xs text-gray-400">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side (Message Box) */}
      <div className="flex-1 flex flex-col">
        <div className="bg-blue-600 text-white p-4 font-bold">
          {chats.find((c) => c.id === selectedChat)?.name || "Select a Chat"}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chatMessages[selectedChat]?.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[70%] ${
                  msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 flex items-center gap-2 border-t bg-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export function ChatBotAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your AI Career Assistant. Ask me anything about jobs, internships, or alumni." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("job")) return "You can check the latest job openings in our Alumni portal.";
    if (msg.includes("internship")) return "Internships are listed under the Opportunities section.";
    if (msg.includes("alumni")) return "You can connect with alumni through the Alumni Directory.";
    return "I can help with career guidance, mentorship, and networking. Try asking me about these topics!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-black rounded-full p-4 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
        >
          <FaRobot size={28} />
        </button>
      )}

      {open && (
        <div className="flex flex-col w-[320px] h-[450px] bg-red-500 shadow-2xl rounded-2xl border border-gray-300 overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 px-4 py-3 flex justify-between items-center rounded-t-2xl shadow-md">
            <div className="flex items-center space-x-2">
              <FaRobot className="h-5 w-5 text-black" />
              <span className="font-bold text-base text-black">AI Career Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-red-700 p-1 rounded transition"
            >
              <FaTimes className="h-4 w-4 text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-red-500">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-3 py-2 max-w-[80%] text-sm break-words shadow-md ${
                    msg.sender === "user"
                      ? "bg-yellow-300 text-black rounded-br-sm"
                      : "bg-white text-black rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-black text-sm italic">Assistant is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300 p-2 bg-red-500">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black"
              autoFocus
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 ml-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

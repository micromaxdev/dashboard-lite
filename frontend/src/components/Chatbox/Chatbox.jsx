import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import { Icon } from "@iconify/react";

function Chatbox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "You're chatting with Micromax AI. How may I assist you today?",
      isUser: false,
    },
  ]);

  const messageEndRef = useRef(null);

  const handleSend = (event) => {
    event.preventDefault();

    if (input.trim() !== "") {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      setLoading(true);
      query({ question: input }).then((response) => {
        setMessages((messages) => [
          ...messages,
          { text: response.text, isUser: false }, // Extract the 'text' property here
        ]);
        setLoading(false);
      });
    }
  };

  async function query(data) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/prediction/6c6b188e-d71e-4a97-a31b-c90a881a4ef1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error querying the server:", error);
      return "Sorry, there was an error. Please try again later.";
    }
  }

  useEffect(() => {
    if (open) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  return (
    <div className={`${open ? "chatbox-open" : "chatbox-close rounded-full "}`}>
      <button
        className={`${
          open
            ? "chatbox-button-open"
            : "w-14 h-14 items-center justify-center rounded-full shadow-xl chatbox-button-close"
        }`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <img src="/images/logo1.png" alt="" className="w-20" />
            </div>
            <div className="flex justify-end pr-2 ">
              <Icon icon="mingcute:minimize-fill" className="text-xl" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center font-semibold text-base items-center ">
            <Icon icon="material-symbols:chat" className="text-3xl" />
          </div>
        )}
      </button>
      {open && (
        <div className="chatbox-content">
          <div className="message-container relative">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.isUser ? "user-message" : "other-message"}
              >
                {message.isUser ? (
                  <div className="w-full relative">
                    <Icon
                      icon="mdi:user"
                      className="absolute top-0 left-0 mr-2 text-xl"
                    />
                    <div className="pl-7 pr-2">{message.text}</div>
                  </div>
                ) : (
                  <div className="w-full relative">
                    <Icon
                      icon="bx:bot"
                      className="absolute top-0 left-0 mr-2 text-xl"
                    />
                    <div className="pl-7 pr-2">{message.text}</div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <p className="loading-indicator mb-5">
                <Icon icon="basil:chat-outline" className="text-2xl" />
              </p>
            )}
            <div ref={messageEndRef} />
          </div>

          <form onSubmit={handleSend} className="input-container">
            <input
              type="text"
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-md"
            />
            <button type="submit">
              <Icon icon="material-symbols:send" className="text-2xl" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbox;

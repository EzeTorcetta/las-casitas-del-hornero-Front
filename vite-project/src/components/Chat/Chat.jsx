import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;

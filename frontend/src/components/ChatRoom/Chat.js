import { useState } from "react";

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type text here...."
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;

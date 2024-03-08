import { useEffect, useState } from "react";
import sendIcon from "../../assets/sendIcon.jpg";
const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  async function handleSendMessage() {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="chat_container">
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
        <button onClick={handleSendMessage} className="send_button">
          <img src={sendIcon} alt="send" className="send_button_img" />
        </button>
      </div>
    </div>
  );
};

export default Chat;

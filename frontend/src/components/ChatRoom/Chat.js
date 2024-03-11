import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import sendIcon from "../../assets/sendIcon.jpg";
import { useParams } from "react-router-dom";

const Chat = ({ socket, userName, room }) => {
  const { UserId } = useParams();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async () => {
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

      try {
        const response = await axios.post(
          "http://localhost:4050/users/sendMessage",
          {
            ChatRoomID: room,
            Content: currentMessage,
          },
          { withCredentials: true }
        );

        console.log(response.data);

        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchRoomMessages = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4050/users/getRoomMessages`,
        { Participant2ID: UserId },
        { withCredentials: true }
      );
      console.log(response);
      const { data, message } = response.data;

      if (data && data.length > 0) {
        setMessageList(
          data.map((message) => ({
            message: message.Content,
            author: message.SenderFullName,
            time: new Date(message.Timestamp).toLocaleTimeString(),
          }))
        );
      } else {
        console.log("No messages found for this room.");
      }

      console.log(message);
    } catch (error) {
      console.error("Error fetching room messages:", error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    fetchRoomMessages();
  }, [socket, room]);
  console.log(userName);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
                key={messageContent.time}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type text here...."
          value={currentMessage}
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

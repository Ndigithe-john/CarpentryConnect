import { useEffect, useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://localhost:4050");
const Room = ({ chatRoomId }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function getUser() {
      try {
        let apiURL = "http://localhost:4050/users/userProfile";
        const response = await axios.get(apiURL, { withCredentials: true });
        setUserName(response.data.data[0]);
        console.log(userName.FullName);
      } catch (error) {
        console.error("Error fetching userName", error.message);
      }
    }
    getUser();
  }, []);
  const joinRoom = () => {
    if (userName !== "" && chatRoomId) {
      socket.emit("join_room", chatRoomId);
    }
  };
  return (
    <div>
      <h3>Join chat</h3>

      <button onClick={joinRoom}>Join A Room</button>
      <Chat socket={socket} userName={userName.FullName} room={chatRoomId} />
    </div>
  );
};

export default Room;

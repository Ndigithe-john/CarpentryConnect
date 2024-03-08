import { useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4050");
const Room = ({ chatRoomId }) => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  console.log(chatRoomId);
  return (
    <div>
      <h3>Join chat</h3>
      <input
        type="text"
        placeholder="john.."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join A Room</button>
      <Chat socket={socket} userName={userName} room={room} />
    </div>
  );
};

export default Room;

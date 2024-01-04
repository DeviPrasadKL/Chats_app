import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3000");

function App() {
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [msgReceived, setMsgReceived] = useState("");

  const sendMessage = () => {
    socket.emit('sendMessage', { msg, room });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log('Recevived Message = ', data);
      setMsgReceived(data.msg);
    });
  }, [socket])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div>
        <input type="text" placeholder='Room number' value={room} onChange={(e) => { setRoom(e.target.value) }} />
        <button onClick={joinRoom} type="button">Join Room</button>
      </div>
      <div>
        <input type="text" placeholder='Message....' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
        <button onClick={sendMessage} type="button">Send Message</button>
        <h3> Message: {msgReceived}</h3>
      </div>
    </div>
  )
}

export default App

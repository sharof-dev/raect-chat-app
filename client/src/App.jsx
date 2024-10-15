import React, { useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat';


const socket = io('http://localhost:3001')
const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [show, setShow] = useState(false);
  const joinRoom = () => {
    if (username !== '' || room !== '') {
      socket.emit("join_room", room)
      setShow(true)
    }

  }


  return (
    <div className='App'>
      {!show ?
        (<div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder='John...' onChange={e => setUsername(e.target.value)} />
          <input type="text" placeholder='Room ID...' onChange={e => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>) :
        (<Chat socket={socket} username={username} room={room} />)
      }
    </div>
  )
}

export default App

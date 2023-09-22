import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chat from '../Components/Chat';

// import { getAppointmentDetail } from '../Features/appointmentDetailsSlice';
const socket = io.connect('http://localhost:5000');

function ChatScreen() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  // useEffect(() => {
  //   dispatch();
  // });

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={event => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatScreen;

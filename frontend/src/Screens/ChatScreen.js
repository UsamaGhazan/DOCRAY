import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chat from '../Components/Chat';
import { useLocation } from 'react-router-dom';

// import { getAppointmentDetail } from '../Features/appointmentDetailsSlice';
const socket = io.connect('http://localhost:5000');

function ChatScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { doctorName, doctorImage, patientName, roomId } = location.state;
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    socket.emit('join_room', room);
  });
  return (
    <div className="App">
      <Chat
        socket={socket}
        username={patientName}
        room={roomId}
        doctorImage={doctorImage}
        doctorName={doctorName}
      />
    </div>
  );
}

export default ChatScreen;

import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Chat from '../Components/Chat';
import { useLocation } from 'react-router-dom';

// import { getAppointmentDetail } from '../Features/appointmentDetailsSlice';
const socket = io.connect('http://localhost:5000');

function ChatScreen() {
  // const dispatch = useDispatch();
  const location = useLocation();
  const { doctorName, doctorImage, patientName, patientImage, roomId } =
    location.state;
  // const [username, setUsername] = useState('');
  // const [room, setRoom] = useState('');
  // const [showChat, setShowChat] = useState(false);
  console.log(doctorImage);

  useEffect(() => {
    socket.emit('join_room', roomId);
  });
  return (
    <div className="App">
      <Chat
        socket={socket}
        username={patientName}
        room={roomId}
        doctorImage={doctorImage}
        doctorName={doctorName}
        patientImage={patientImage}
      />
    </div>
  );
}

export default ChatScreen;

import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from '../Components/Chat';
const ChatScreen = () => {
  const socket = io.connect('http://localhost:5000');

  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (name !== '' && roomId !== '') {
      socket.emit('join_room', roomId);
      setShowChat(true);
    }
  };
  return (
    <Box>
      {!showChat ? (
        <>
          <h3>Join chat</h3>
          <Input
            placeholder="Name..."
            onChange={e => setName(e.target.value)}
          />
          <Input
            placeholder="Room Id..."
            onChange={e => setRoomId(e.target.value)}
          />
          <Button onClick={joinRoom}>Join Room</Button>
        </>
      ) : (
        <Chat socket={socket} name={name} roomId={roomId} />
      )}
    </Box>
  );
};

export default ChatScreen;

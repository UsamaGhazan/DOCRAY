import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Chat = ({ socket, name, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // Joining the room when the component mounts
  useEffect(() => {
    socket.emit('join_room', roomId);
  }, [socket, roomId]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const data = {
        roomId,
        author: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', data);
      setCurrentMessage('');
      setMessageList(prevMessages => [...prevMessages, data]);
    }
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(prevMessages => [...prevMessages, data]);
    });
  }, [socket]);
  return (
    <Box>
      <p>Live Chat</p>
      <Box>
        <Box
          border="2px solid red"
          borderRadius="md"
          boxShadow="lg"
          p={4}
          bg="white"
        >
          <Box>
            {messageList.map((messageContent, index) => {
              return (
                <Box
                  key={index}
                  textAlign={messageContent.author === name ? 'left' : 'right'}
                  mb={4}
                >
                  <Box
                    display="inline-block"
                    bg={
                      messageContent.author === name ? 'blue.500' : 'gray.300'
                    }
                    color={messageContent.author === name ? 'white' : 'black'}
                    borderRadius="lg"
                    p={3}
                    maxWidth="70%"
                  >
                    <Box fontWeight="semibold">{messageContent.author}</Box>
                    <Box>{messageContent.message}</Box>
                    <Box fontSize="sm" textAlign="right">
                      {messageContent.time}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Input
          type="text "
          onChange={e => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button onClick={sendMessage}>&#9658;</Button>
      </Box>
    </Box>
  );
};

export default Chat;

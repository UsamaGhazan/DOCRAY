import React, { useEffect, useState } from 'react';
import { Box, Button, Input, List, Text, useColorMode } from '@chakra-ui/react';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList(list => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data]);
    });
  }, [socket]);

  return (
    <Box>
      <p>Live Chat</p>
      <Box>
        <List
          p={4}
          bg={'white'}
          justifyContent="space-between"
          alignItems="center"
        >
          {messageList.map((messageContent, index) => (
            <Box
              key={index}
              textAlign={messageContent.author === username ? 'left' : 'right'}
              mb={4}
            >
              <Box
                display="inline-block"
                bg={
                  messageContent.author === username ? 'blue.500' : 'gray.300'
                }
                color={messageContent.author === username ? 'white' : 'black'}
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
          ))}
        </List>
      </Box>
      <Input
        type="text"
        onChange={e => setCurrentMessage(e.target.value)}
        value={currentMessage}
        placeholder="Type a message..."
      />
      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
}

export default Chat;

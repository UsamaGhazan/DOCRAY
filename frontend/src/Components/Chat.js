import React, { useEffect, useState } from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';
import { Box, Button, Input } from '@chakra-ui/react';
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  console.log(messageList);
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
      console.log('emitting send_message');

      await socket.emit('send_message', messageData);
      setMessageList(list => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    console.log('Inside receive_message.on useEffect ');

    socket.on('receive_message', data => {
      console.log('receive_message.on ', data);
      setMessageList(list => [...list, data]);
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
            {messageList.map((messageContent, index) => (
              <Box
                key={index}
                textAlign={
                  messageContent.author === username ? 'left' : 'right'
                }
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
          </Box>
        </Box>
        <Input
          type="text"
          onChange={e => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button onClick={sendMessage}>&#9658;</Button>
      </Box>
    </Box>
  );
}

export default Chat;

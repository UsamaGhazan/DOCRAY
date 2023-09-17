import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Input,
  List,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { patientInfo } = useSelector(store => store.patientLogin);
  const { doctorInfo } = useSelector(store => store.doctorLogin);

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
      <Heading size={'sm'}>Live Chat</Heading>
      <HStack>
        <Box width={'25%'} height={'100vh'}>
          <Avatar></Avatar>{' '}
        </Box>
        <VStack width="75%" alignItems="center">
          <Box width={'100%'}>
            <List
              p={4}
              bg={'white'}
              justifyContent="space-between"
              alignItems="center"
              border={'2px solid green'}
              height={'93vh'}
            >
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
                      messageContent.author === username
                        ? 'blue.500'
                        : 'gray.300'
                    }
                    color={
                      messageContent.author === username ? 'white' : 'black'
                    }
                    borderRadius="lg"
                    p={3}
                    maxWidth="70%"
                  >
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
            width={'100%'}
          />
        </VStack>
      </HStack>

      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
}

export default Chat;

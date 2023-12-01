import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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

function Chat({
  socket,
  username,
  room,
  doctorImage,
  doctorName,
  patientImage,
}) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { patientInfo } = useSelector(store => store.patientLogin);
  const { doctorInfo } = useSelector(store => store.doctorLogin);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: patientInfo ? username : doctorName,
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
      <HStack>
        <Box width={'25%'} height={'100vh'}>
          {patientInfo && (
            <VStack>
              <Heading color={'#5180af'} size={'lg'}>
                Live Chat
              </Heading>

              <Avatar name={doctorName} src={doctorImage} size={'2xl'} />
              <Heading color={'#5180af'} size={'lg'}>
                Dr. {doctorName}
              </Heading>
            </VStack>
          )}
        </Box>
        <VStack width="75%" alignItems="center">
          <Box
            width={'100%'}
            border={'10px solid #006bd5'}
            borderRadius={'5px'}
          >
            <Link to="/videoCall" target="_blank" rel="noopener noreferrer">
              <FaVideo
                style={{
                  color: '#000',
                  fontSize: '24px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  position: 'absolute',
                  right: '20',
                }}
              />
            </Link>
            <List
              p={4}
              bg={'white'}
              justifyContent="space-between"
              alignItems="center"
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
                    fontSize={'15px'}
                    fontFamily={'other'}
                  >
                    <Box>{messageContent.message}</Box>
                    <Box fontSize="sm" textAlign="right">
                      {messageContent.time}
                    </Box>
                  </Box>
                </Box>
              ))}
            </List>
            <Input
              type="text"
              onChange={e => setCurrentMessage(e.target.value)}
              value={currentMessage}
              placeholder="Type a message..."
              width={'100%'}
              border={'none'}
            />
          </Box>
        </VStack>
      </HStack>

      <Button
        bg={'#000066'}
        color={'white'}
        _hover={{ bg: '#000033' }}
        _active={{ bg: '#000033' }}
        ml={'385px'}
        mt={'1px'}
        size={'md'}
        width={'100px'}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
}

export default Chat;

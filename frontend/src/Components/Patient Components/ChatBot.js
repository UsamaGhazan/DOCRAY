import React, { useState } from 'react';
import { Flex, Icon, Input, Button, Text, Box } from '@chakra-ui/react';
import { IoChatbubblesSharp, IoClose } from 'react-icons/io5';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const toggleState = () => {
    setIsOpen(!isOpen);
  };

  const onSendButton = async () => {
    if (inputText === '') {
      return;
    }

    const newMessages = [...messages, { name: 'User', message: inputText }];

    setMessages(newMessages);

    try {
      const response = await axios.post('http://127.0.0.1:8000/chat_predict', {
        message: inputText,
      });

      const responseMessage = response.data.answer;
      const newMessagesWithResponse = [
        ...newMessages,
        { name: 'Sam', message: responseMessage },
      ];

      setMessages(newMessagesWithResponse);
    } catch (error) {
      console.error('Error:', error);
    }

    setInputText('');
  };

  return (
    <Flex
      direction="column"
      maxW="400px"
      p="4"
      bgColor="white"
      borderRadius="md"
      position="fixed"
      bottom="30px"
      right="30px"
    >
      <Flex justify="space-between" align="center">
        <Icon
          as={IoChatbubblesSharp}
          boxSize={'40px'}
          onClick={toggleState}
          color={'button.50'}
        />
        {isOpen && (
          <Icon
            as={IoClose}
            boxSize={'20px'}
            cursor="pointer"
            onClick={toggleState}
          />
        )}
      </Flex>

      {isOpen && (
        <Box mt="4">
          <Flex direction="column">
            <Box mb="2">
              <Text fontWeight="bold">Ask me anything about Docray:</Text>
            </Box>

            <Box mb="4" p="2" bgColor="gray.100" borderRadius="md">
              {messages.map((message, index) => (
                <Box
                  key={index}
                  py="1"
                  px="2"
                  borderRadius="md"
                  mb="2"
                  bgColor={message.name === 'Sam' ? 'blue.100' : 'white'}
                >
                  {message.message}
                </Box>
              ))}
            </Box>

            <Flex>
              <Input
                mr="2"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && onSendButton()}
                placeholder="Write a message..."
              />
              <Button onClick={onSendButton}>Send</Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default ChatBot;

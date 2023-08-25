import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import peer from '../service/peer';

const Chat = ({ socket, name, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remoteStream, setRemoteStream] = useState();
  const [hasSentStreams, setHasSentStreams] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isSharingStream, setIsSharingStream] = useState(false);

  const [myStream, setMyStream] = useState();

  useEffect(() => {
    socket.emit('join_room', { name, roomId });
    setRemoteSocketId(roomId);

    // Set up event listeners for incoming call and call accepted
    socket.on('incomming:call', handleIncommingCall);
    socket.on('call:accepted', handleCallAccepted);

    return () => {
      // Clean up event listeners
      socket.off('incomming:call', handleIncommingCall);
      socket.off('call:accepted', handleCallAccepted);
    };
  }, [socket, roomId, name]);

  const sendStreams = async () => {
    if (!hasSentStreams) {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
      setHasSentStreams(true);
    }
  };

  const handleCallUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peer.getOffer();
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
      setIsCallAccepted(true); // Automatically accept the call when initiating
      sendStreams();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallAccepted = async ({ ans }) => {
    await peer.peer.setLocalDescription(ans);
    console.log('Call Accepted!');
    setIsCallAccepted(true);
    sendStreams();
  };

  const handleIncommingCall = async ({ offer }) => {
    setRemoteSocketId(roomId);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    const remoteOffer = new RTCSessionDescription(offer);
    await peer.peer.setRemoteDescription(remoteOffer);

    const ans = await peer.getAnswer();
    await peer.peer.setLocalDescription(ans);

    socket.emit('call:accepted', { ans });
    setIsCallAccepted(true);
    sendStreams();
  };

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
                textAlign={messageContent.author === name ? 'left' : 'right'}
                mb={4}
              >
                <Box
                  display="inline-block"
                  bg={messageContent.author === name ? 'blue.500' : 'gray.300'}
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
            ))}
          </Box>
        </Box>
        <Input
          type="text"
          onChange={e => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button onClick={sendMessage}>&#9658;</Button>
        {!isCallAccepted && <Button onClick={handleCallUser}>CALL</Button>}
        {isCallAccepted && myStream && (
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={URL.createObjectURL(myStream)}
          />
        )}

        {/* Display remote video stream */}
        {isCallAccepted && remoteStream && (
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={URL.createObjectURL(remoteStream)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Chat;

import { Box, Button, Input } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import peer from '../service/peer';
const Chat = ({ socket, name, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remoteStream, setRemoteStream] = useState();
  const [hasSentStreams, setHasSentStreams] = useState(false);

  console.log('Remote stream ', remoteStream);

  const [myStream, setMyStream] = useState();
  console.log(myStream);
  // Joining the room when the component mounts
  useEffect(() => {
    socket.emit('join_room', { name, roomId });
    setRemoteSocketId(roomId);
  }, [socket, roomId, name]);

  const sendStreams = useCallback(() => {
    if (!hasSentStreams) {
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
      setHasSentStreams(true);
    }
  }, [myStream, hasSentStreams]);
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log('Call Accepted!');
      sendStreams();
    },
    [sendStreams]
  );
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);
  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    const handleTrack = async ev => {
      const remoteStream = ev.streams;
      console.log('GOT TRACKS!!');
      setRemoteStream(remoteStream[0]);
    };

    peer.peer.addEventListener('track', handleTrack);

    return () => {
      peer.peer.removeEventListener('track', handleTrack);
    };
  }, []);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      // Set the remote description using the received offer
      await peer.peer.setRemoteDescription(offer);

      console.log(`Incoming Call`, from, offer);

      // Create an answer and set it as the local description
      const ans = await peer.getAnswer();
      await peer.peer.setLocalDescription(ans);

      socket.emit('call:accepted', { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit('peer:nego:done', { to: from, ans });
    },
    [socket]
  );
  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    console.log('Useffect peer:nego:needed 1');
    socket.on('incomming:call', handleIncommingCall);
    socket.on('call:accepted', handleCallAccepted);
    socket.on('peer:nego:needed', handleNegoNeedIncomming);
    socket.on('peer:nego:final', handleNegoNeedFinal);
    return () => {
      socket.off('incomming:call', handleIncommingCall);
      socket.off('call:accepted', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegoNeedIncomming);
      socket.off('peer:nego:final', handleNegoNeedFinal);
    };
  }, [
    socket,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

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

  const handleCallUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const offer = await peer.getOffer();
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
    } catch (error) {}
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
        {myStream && <Button onClick={sendStreams}> Send Stream</Button>}
        <Button onClick={handleCallUser}>CALL</Button>
        {myStream && (
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={myStream}
          />
        )}
        <h1>Remote Stream</h1>
        {remoteStream && (
          <ReactPlayer
            playing
            muted
            height="100px"
            width="200px"
            url={remoteStream}
          />
        )}
      </Box>
    </Box>
  );
};

export default Chat;

import React, { useContext } from 'react';
import { Grid, Text, Box, useStyleConfig, HStack } from '@chakra-ui/react'; // Import Chakra UI components

import { SocketContext } from '../../context/SocketProvider';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  console.log('Call accepted ', callAccepted);
  console.log('Call ended ', callEnded);

  const videoStyle = useStyleConfig('VideoPlayer'); // Using Chakra UI style configuration

  return (
    <Grid container flexDirection={{ base: 'column', md: 'row' }}>
      {' '}
      <HStack>
        {stream && (
          <Box
            borderWidth="2px"
            borderColor="black"
            padding="10px"
            margin="10px"
            {...videoStyle}
          >
            <Text fontSize="xl" fontWeight="bold" marginBottom="4">
              {name || 'Name'}
            </Text>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={videoStyle}
            />
          </Box>
        )}
        {callAccepted && !callEnded && (
          <Box
            borderWidth="2px"
            borderColor="black"
            padding="10px"
            margin="10px"
            {...videoStyle}
          >
            <Text fontSize="xl" fontWeight="bold" marginBottom="4">
              {call.name || 'Name'}
            </Text>
            <video playsInline ref={userVideo} autoPlay style={videoStyle} />
          </Box>
        )}
      </HStack>
    </Grid>
  );
};

export default VideoPlayer;

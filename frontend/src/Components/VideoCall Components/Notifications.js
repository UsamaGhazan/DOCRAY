import React, { useContext } from 'react';
import { Box, Button } from '@chakra-ui/react'; // Import Chakra UI components

import { SocketContext } from '../../context/SocketProvider';
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          marginTop="4"
        >
          <Box as="h1">{call.name} is calling:</Box>
          <Button
            as={Box}
            variant="contained"
            colorScheme="blue"
            onClick={answerCall}
          >
            Answer
          </Button>
        </Box>
      )}
    </>
  );
};

export default Notifications;

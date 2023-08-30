import React from 'react';
import VideoPlayer from '../Components/Chat Components/VideoPlayer';
import Options from '../Components/Chat Components/Options';
import Notifications from '../Components/Chat Components/Notifications';
import { Box } from '@chakra-ui/react';
const VideoCallScreen = () => {
  return (
    <>
      <Box>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </Box>
    </>
  );
};

export default VideoCallScreen;

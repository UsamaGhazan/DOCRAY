import React from 'react';
import VideoPlayer from '../Components/VideoCall Components/VideoPlayer';
import Options from '../Components/VideoCall Components/Options';
import Notifications from '../Components/VideoCall Components/Notifications';
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

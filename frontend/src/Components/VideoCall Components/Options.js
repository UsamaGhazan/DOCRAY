import React, { useState, useContext } from 'react';
import {
  Button,
  Text,
  Input,
  Grid,
  Container,
  Box,
  useStyleConfig,
  HStack,
} from '@chakra-ui/react';
import { FaCopy, FaPhone, FaPhoneSlash } from 'react-icons/fa'; // Import icons from react-icons
import { SocketContext } from '../../context/SocketProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState();
  const [isIdCopied, setIsIdCopied] = useState(false);
  const handleCopyClick = () => {
    setIsIdCopied(true);

    setTimeout(() => {
      setIsIdCopied(false);
    }, 3000);
  };

  const sidebarStyle = useStyleConfig('Sidebar'); // Using Chakra UI style configuration

  return (
    <Container {...sidebarStyle}>
      <Box
        borderWidth="2px"
        borderColor="black"
        padding="10px 20px"
        {...sidebarStyle}
      >
        <form className="root" noValidate autoComplete="off">
          <Grid
            container
            flexDirection={{ base: 'column', md: 'row' }} // Responsive flexDirection
          >
            <Box padding={{ base: '20px', md: '0' }}>
              <Text fontSize="xl" marginBottom="4">
                Account Info
              </Text>
              <Text>Name</Text>
              <Input
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard
                text={me}
                onCopy={handleCopyClick}
                className="margin"
              >
                <Button
                  as={Box}
                  variant="contained"
                  colorScheme="blue"
                  size="lg"
                  marginBottom="4"
                >
                  <FaCopy /> Copy Your ID
                </Button>
              </CopyToClipboard>
              {isIdCopied && <Text color="green">ID Copied!</Text>}
            </Box>
            <Box padding={{ base: '20px', md: '0' }}>
              <Text fontSize="xl" marginBottom="4">
                Make a Call
              </Text>
              <Input
                label="ID to call"
                value={idToCall}
                onChange={e => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <HStack>
                  {' '}
                  <FaPhoneSlash />
                  <Button
                    variant="contained"
                    colorScheme="blue"
                    size="16px"
                    onClick={leaveCall}
                    marginBottom="4"
                  >
                    Hang Up
                  </Button>
                </HStack>
              ) : (
                <HStack>
                  {' '}
                  <FaPhone />
                  <Button
                    variant="contained"
                    colorScheme="blue"
                    size="16px"
                    onClick={() => callUser(idToCall)}
                    marginBottom="4"
                  >
                    Call
                  </Button>
                </HStack>
              )}
            </Box>
          </Grid>
        </form>
        {children}
      </Box>
    </Container>
  );
};

export default Options;

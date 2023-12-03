import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DoctorModal from '../Components/Doctor Components/DoctorModal';
import SearchDoctor from '../Components/Patient Components/SearchDoctor';
import ChatBot from '../Components/Patient Components/ChatBot';
import {
  HStack,
  Heading,
  Text,
  VStack,
  Box,
  Button,
  Image,
  Stack,
  Card,
  Center,
  Flex,
} from '@chakra-ui/react';
const HomeScreen = () => {
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const texts = [
      '2000+ doctors',
      '3000+ patient reviews',
      '10000+ users served',
    ];

    const interval = setInterval(() => {
      setText(texts[currentIndexRef.current]);
      currentIndexRef.current = (currentIndexRef.current + 1) % texts.length;
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="homeScreen">
      <section className="landingScreen">
        <VStack w="full">
          <VStack mt="100px">
            <Text fontSize="40px" color="white">
              Find and book the{' '}
              <span style={{ color: '#ff9e24' }}> best doctors </span>near you
            </Text>
            <SearchDoctor />
          </VStack>
          <span
            style={{
              height: '59px',
              display: 'inline-block',
              color: 'white',
              marginTop: '60px',
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 1.2,
              textAlign: Center,
              backgroundColor: '#20247f',
              padding: '13px 30px',
              transition: 'all 0s ease 0s',
            }}
          >
            {text}
          </span>
        </VStack>
      </section>
      <section className="homeCards">
        <HStack>
          <Card maxW="456px" overflow="hidden" variant="outline">
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Image
                src={require('../images/pneumonia.png')}
                alt="pneumonia"
                h={{ base: '200px', sm: '128px' }}
                w={{ base: 'full', sm: '158px' }}
                objectFit="cover"
              />

              <Stack flexGrow="1" justifyContent="center">
                <Heading size="16px" fontWeight="600" marginLeft="17px">
                  Pneumonia Test
                </Heading>

                <Text fontSize="13.6px" className="text">
                  Get tested for pneumonia with our reliable and accurate
                  testing service
                </Text>

                <Box>
                  <Button
                    as={Link}
                    to={'/pneumoniaDetection'}
                    marginLeft="17px"
                    size="sm"
                    variant="solid"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="purplebtn"
                    _hover={{ bg: '#000033' }}
                    _active={{ bg: '#000033' }}
                  >
                    Test Now {'>'}
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
          <Card maxW="456px" overflow="hidden" variant="outline">
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Image
                src={require('../images/doccare.jpg')}
                alt="Doc care"
                h={{ base: '200px', sm: '128px' }}
                w={{ base: 'full', sm: '158px' }}
                objectFit="cover"
              />

              <Stack flexGrow="1" justifyContent="center">
                <Heading size="16px" fontWeight="600" marginLeft="17px">
                  Doc Care
                </Heading>

                <Text fontSize="13.6px" className="text">
                  Book appointments with top-rated doctors for superior medical
                  care{' '}
                </Text>

                <Box>
                  <Button
                    as={Link}
                    onClick={handleModalOpen}
                    marginLeft="17px"
                    size="sm"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="goldbtn"
                    _hover={{ bg: '#faa63a' }}
                    _active={{ bg: '#faa63a' }}
                  >
                    Book Appointment
                  </Button>
                  <DoctorModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                  />
                </Box>
              </Stack>
            </Stack>
          </Card>
          <Card maxW="456px" overflow="hidden" variant="outline">
            <Stack direction={{ base: 'column', sm: 'row' }}>
              <Image
                src={require('../images/tb2.jpg')}
                alt="Caffe Latte"
                h={{ base: '200px', sm: '128px' }}
                w={{ base: 'full', sm: '158px' }}
                objectFit="cover"
              />

              <Stack flexGrow="1" justifyContent="center">
                <Heading size="16px" fontWeight="600" marginLeft="17px">
                  TB Test
                </Heading>

                <Text fontSize="13.6px" className="text">
                  Get tested for TB with our reliable and accurate testing
                  service
                </Text>

                <Box>
                  <Button
                    as={Link}
                    to={'/tbDetection'}
                    marginLeft="17px"
                    size="sm"
                    variant="solid"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="purplebtn"
                    _hover={{ bg: '#000033' }}
                    _active={{ bg: '#000033' }}
                  >
                    Test Now {'>'}
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </HStack>
      </section>
      <Flex
        position="fixed"
        bottom="30px"
        right="30px"
        direction="column"
        alignItems="flex-end"
      >
        <ChatBot />
      </Flex>
    </section>
  );
};

export default HomeScreen;

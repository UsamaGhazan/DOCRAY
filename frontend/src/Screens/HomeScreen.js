import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import {
  HStack,
  Heading,
  Text,
  VStack,
  Box,
  Button,
  Image,
  CardFooter,
  CardBody,
  Stack,
  Card,
  Center,
} from '@chakra-ui/react';
import SliderTextAnimation from '../Components/SliderAnimation';
import SearchDoctor from '../Components/SearchDoctor';
const HomeScreen = () => {
  const [text, setText] = useState('');

  const texts = [
    '2000+ doctors',
    '3000+ patient reviews',
    '10000+ users served',
  ];
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setText(texts[currentIndex]);
      currentIndex = (currentIndex + 1) % texts.length;
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
                    marginLeft="17px"
                    size="sm"
                    variant="solid"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="purplebtn"
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
                    to="/doctors"
                    marginLeft="17px"
                    size="sm"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="goldbtn"
                  >
                    Book Appointment
                  </Button>
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
                    marginLeft="17px"
                    size="sm"
                    variant="solid"
                    lineHeight="1.5"
                    borderRadius="4px"
                    className="purplebtn"
                  >
                    Test Now {'>'}
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </HStack>
      </section>
    </section>
  );
};

export default HomeScreen;

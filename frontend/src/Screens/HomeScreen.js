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
} from '@chakra-ui/react';
import SliderTextAnimation from '../Components/SliderAnimation';
import SearchDoctor from '../Components/SearchDoctor';
const HomeScreen = () => {
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
            <SliderTextAnimation />
          </VStack>
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
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
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
                    variant="solid"
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

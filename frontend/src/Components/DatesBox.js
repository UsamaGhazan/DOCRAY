import React, { useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { FaSun } from 'react-icons/fa';
import {
  IconButton,
  Text,
  Flex,
  Box,
  Icon,
  HStack,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Avatar,
  Heading,
} from '@chakra-ui/react';

const formatDate = date => {
  const options = { month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatTime = date => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format (AM/PM)
    timeZone: 'UTC', // Set the timeZone option to 'UTC' since our input date is in UTC
  };

  const utcDate = new Date(date);
  const localTime = utcDate.toLocaleString(undefined, options);
  return localTime;
};

const DateBox = ({ name, image, availableTimeSlots }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const handleNextDates = () => {
    const nextStartDate = new Date(startDate);
    nextStartDate.setDate(startDate.getDate() + 4);
    setStartDate(nextStartDate);
    setSelectedDate(null);
  };

  const handlePrevDates = () => {
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(startDate.getDate() - 4);
    setStartDate(prevStartDate);
    setSelectedDate(null);
  };

  const handleDateClick = date => {
    setSelectedDate(date.toLocaleDateString(undefined, { timeZone: 'UTC' }));
  };

  const areSlotsAvailable = availableTimeSlots.some(timeslot => {
    const { startTime } = timeslot;

    const startTimeDate = new Date(startTime);
    return (
      startTimeDate.toLocaleDateString(undefined, {
        timeZone: 'UTC',
      }) === selectedDate
    );
  });

  const handleSlotClick = timeSlot => {
    setSelectedTime(formatTime(new Date(timeSlot.startTime)));
    onOpen();
  };

  const continueBooking = () => {
    console.log(selectedDate);
    console.log(selectedTime);
  };

  return (
    <Box
      width="742px"
      height="313px"
      bg="#ffffff"
      borderRadius="md"
      p={4}
      ml="388px"
      mt="31px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<AiOutlineLeft />}
          aria-label="Previous Dates"
          onClick={handlePrevDates}
        />
        {[...Array(4)].map((_, index) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + index);
          return (
            <Text
              key={index}
              fontSize="14px"
              fontWeight={600}
              mx={2}
              cursor="pointer"
              onClick={() => handleDateClick(date)}
              style={{
                borderBottom:
                  selectedDate ===
                  date.toLocaleDateString(undefined, {
                    timeZone: 'UTC',
                  })
                    ? '2px solid #FF9E15'
                    : 'none',
                color:
                  selectedDate ===
                  date.toLocaleDateString(undefined, {
                    timeZone: 'UTC',
                  })
                    ? '#FF9E15'
                    : 'black',
                cursor: 'pointer',
              }}
            >
              {formatDate(date)}
            </Text>
          );
        })}
        <IconButton
          icon={<AiOutlineRight />}
          aria-label="Next Dates"
          onClick={handleNextDates}
        />
      </Flex>
      {selectedDate && (
        <Box mt={4}>
          <HStack>
            <Icon as={FaSun} color="orange" />
            <Text fontSize="12px" fontWeight="600" mt={4} color="#8C9196">
              Morning Slots:
            </Text>
          </HStack>
          <Flex flexWrap="wrap" mt={5} ml="44px">
            {areSlotsAvailable ? (
              availableTimeSlots.map((timeslot, index) => {
                const { startTime } = timeslot;
                const startTimeDate = new Date(startTime);
                const formattedStartTime = formatTime(startTimeDate);

                if (
                  startTimeDate.toLocaleDateString(undefined, {
                    timeZone: 'UTC',
                  }) === selectedDate &&
                  formattedStartTime.includes('AM')
                ) {
                  return (
                    <Box
                      key={index}
                      width="109px"
                      height="41px"
                      p={2}
                      m={1}
                      borderRadius="10px"
                      bg="white"
                      border="2px solid #E6E5F0"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      cursor="pointer"
                      _hover={{
                        color: '#FF9E15',
                        borderColor: '#FF9E15',
                        transition: 'all 0.5s ease-in-out',
                      }}
                      fontSize={14}
                      fontWeight={600}
                      onClick={() => handleSlotClick(timeslot)}
                    >
                      {formattedStartTime}
                    </Box>
                  );
                }

                return null;
              })
            ) : (
              <Alert status="warning" m="auto">
                <AlertIcon />
                Sorry! No Slot Available at this moment
              </Alert>
            )}
          </Flex>
          <HStack mt={10} position="absolute">
            <Icon as={FaSun} color="orange" />

            <Text fontSize="12px" fontWeight="600" color="#8C9196">
              Afternoon Slots:
            </Text>
          </HStack>
          <Flex flexWrap="wrap" mt={47} ml="44px">
            {areSlotsAvailable ? (
              availableTimeSlots.map((timeslot, index) => {
                const { startTime } = timeslot;
                const startTimeDate = new Date(startTime);
                const formattedStartTime = formatTime(startTimeDate);

                if (
                  startTimeDate.toLocaleDateString(undefined, {
                    timeZone: 'UTC',
                  }) === selectedDate &&
                  formattedStartTime.includes('PM')
                ) {
                  return (
                    <Box
                      key={index}
                      width="109px"
                      height="41px"
                      p={2}
                      m={1}
                      borderRadius="10px"
                      bg="white"
                      border="2px solid #E6E5F0"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      cursor="pointer"
                      _hover={{
                        color: '#FF9E15',
                        borderColor: '#FF9E15',
                        transition: 'all 0.5s ease-in-out',
                      }}
                      fontSize={14}
                      fontWeight={600}
                      mt={35}
                      onClick={() => handleSlotClick(timeslot)}
                    >
                      {formattedStartTime}
                    </Box>
                  );
                }

                return null;
              })
            ) : (
              <Alert status="warning" mt="32px">
                <AlertIcon />
                Sorry! No Slot Available at this moment
              </Alert>
            )}
          </Flex>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start">
              <Text fontSize={14} fontWeight={600} color="#8C9196" ml={150}>
                {' '}
                Your Appointment Details
              </Text>{' '}
              <HStack spacing={140}>
                <HStack>
                  <Avatar name={name} src={image} size="xs" />
                  <Heading fontSize="16px" fontWeight={600}>
                    {name}
                  </Heading>
                </HStack>
                <HStack fontSize="16px" fontWeight={600}>
                  <Text>{formatDate(selectedDate)},</Text>
                  <Text>{selectedTime}</Text>
                </HStack>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter alignItems={'center'} justifyContent={'center'}>
            <Button
              className="purplebtn"
              colorScheme="blue"
              mr={3}
              onClick={() => continueBooking()}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateBox;

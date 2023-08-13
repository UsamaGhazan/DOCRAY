import React, { useEffect, useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { FaSun } from 'react-icons/fa';
import { bookPatient } from '../../Features/PatientFeature/bookPatientApptSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BOOK_PATIENT_RESET } from '../../Features/PatientFeature/bookPatientApptSlice';
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
  Spinner,
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

const DateBox = ({ name, image, availableTimeSlots, doctorID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const { loading, data, error } = useSelector(store => store.patientAppt);
  const timeSlots = [
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
  ];

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  console.log(selectedDate);
  const handleNextDates = () => {
    const nextStartDate = new Date(startDate);
    nextStartDate.setDate(startDate.getDate() + 1);
    setStartDate(nextStartDate);
    setSelectedDate(nextStartDate);
    console.log(nextStartDate);
  };

  const handlePrevDates = () => {
    const prevStartDate = new Date(startDate);
    console.log(startDate);
    prevStartDate.setDate(startDate.getDate() - 1);
    setStartDate(prevStartDate);
    setSelectedDate(prevStartDate);
    console.log(prevStartDate);
  };

  const handleDateClick = date => {
    setSelectedDate(date.toLocaleDateString(undefined, { timeZone: 'UTC' }));
  };

  const handleSlotClick = timeSlot => {
    setSelectedTime(formatTime(new Date(timeSlot.startTime)));
    onOpen();
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
      className="dateBox"
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
            {timeSlots.map((timeslot, index) => {
              const startTime = timeslot;

              if (startTime.includes('AM')) {
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
                    {startTime}
                  </Box>
                );
              }

              return null;
            })}
            )
          </Flex>
          <HStack mt={10} position="absolute">
            <Icon as={FaSun} color="orange" />

            <Text fontSize="12px" fontWeight="600" color="#8C9196">
              Afternoon Slots:
            </Text>
          </HStack>
          <Flex flexWrap="wrap" mt={47} ml="44px">
            {timeSlots.map((timeslot, index) => {
              const startTime = timeslot;

              if (startTime.includes('PM')) {
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
                    {startTime}
                  </Box>
                );
              }

              return null;
            })}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default DateBox;

import React, { useEffect, useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailability } from '../../Features/DoctorFeature/setAvailabilitySlice';
import {
  IconButton,
  Text,
  Flex,
  Box,
  Icon,
  HStack,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

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
const formatDate = date => {
  const options = { month: 'long', day: 'numeric' };

  return new Date(date).toLocaleDateString(undefined, options);
};
const SetAvailabilityScreen = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString(undefined, {
      timeZone: 'UTC',
    })
  );
  const { loading, data, error } = useSelector(store => store.patientAppt);
  const [selectedTime, setSelectedTime] = useState({});

  const handleNextDates = () => {
    const nextStartDate = new Date(startDate);

    nextStartDate.setDate(nextStartDate.getDate() + 1);

    setStartDate(nextStartDate);
    setSelectedDate(
      nextStartDate.toLocaleDateString(undefined, { timeZone: 'UTC' })
    );
  };

  const handlePrevDates = () => {
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(startDate.getDate() - 1);
    setStartDate(prevStartDate);
    setSelectedDate(
      prevStartDate.toLocaleDateString(undefined, { timeZone: 'UTC' })
    );
  };

  const handleDateClick = date => {
    console.log('handle date click ', date);
    setSelectedDate(date.toLocaleDateString(undefined, { timeZone: 'UTC' }));
    setSelectedTime(prevSelectedTime => {
      const updatedTime = { ...prevSelectedTime };

      if (!updatedTime[selectedDate]) {
        updatedTime[selectedDate] = [];
      }

      return updatedTime;
    });
  };

  const handleSlotClick = timeSlot => {
    setSelectedTime(prevSelectedTime => {
      const updatedTime = { ...prevSelectedTime };

      if (!updatedTime[selectedDate]) {
        updatedTime[selectedDate] = [];
      }

      const timeIndex = updatedTime[selectedDate].indexOf(timeSlot);

      if (timeIndex === -1) {
        updatedTime[selectedDate].push(timeSlot); // Adding the time slot
      } else {
        updatedTime[selectedDate].splice(timeIndex, 1); // Removing the time slot
      }

      return updatedTime;
    });
  };

  useEffect(() => {
    console.log('Selected Date ', selectedDate);
    if (selectedTime[selectedDate] && selectedTime[selectedDate].length > 0) {
      console.log('Selected Time', selectedTime[selectedDate]);
    }
  }, [selectedDate, selectedTime]);

  // Checking if any times are selected for the given dates
  const hasSelectedTime = () => {
    for (const date in selectedTime) {
      if (selectedTime[date].length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    const selectedSlots = [];
    for (const date in selectedTime) {
      selectedSlots.push({ date, time: selectedTime[date] });
    }

    dispatch(setAvailability({ timeSlots: selectedSlots }));
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
      <Box mt={4}>
        <HStack>
          <Icon as={FaSun} color="orange" />
          <Text fontSize="12px" fontWeight="600" mt={4} color="#8C9196">
            Morning Slots:
          </Text>
        </HStack>
        <Flex flexWrap="wrap" mt={5} ml="44px">
          {timeSlots.map((timeslot, index) => {
            const formattedStartTime = timeslot;

            if (formattedStartTime.includes('AM')) {
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
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    borderColor: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  fontSize={14}
                  fontWeight={600}
                  onClick={() => handleSlotClick(timeslot)} // Handle the click
                  style={{
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'white'
                      : 'black',
                    // Add a class to indicate selected slots for styling
                    backgroundColor: selectedTime[selectedDate]?.includes(
                      timeslot
                    )
                      ? '#FF9E15'
                      : 'white',
                    borderColor: selectedTime[selectedDate]?.includes(timeslot)
                      ? '#FF9E15'
                      : '#E6E5F0',
                  }}
                  // Add a class to indicate disabled slots for styling
                  className={
                    selectedTime[selectedDate]?.includes(timeslot)
                      ? 'disabled-slot'
                      : ''
                  }
                >
                  {formattedStartTime}
                </Box>
              );
            }

            return null;
          })}
        </Flex>
        <HStack mt={10} position="absolute">
          <Icon as={FaSun} color="orange" />
          <Text fontSize="12px" fontWeight="600" color="#8C9196">
            Afternoon Slots:
          </Text>
        </HStack>
        <Flex flexWrap="wrap" mt={83} ml="44px">
          {timeSlots.map((timeslot, index) => {
            const formattedStartTime = timeslot;

            if (formattedStartTime.includes('PM')) {
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
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    borderColor: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  fontSize={14}
                  fontWeight={600}
                  onClick={() => handleSlotClick(timeslot)} // Handle the click
                  style={{
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'white'
                      : 'black',
                    // Add a class to indicate selected slots for styling
                    backgroundColor: selectedTime[selectedDate]?.includes(
                      timeslot
                    )
                      ? '#FF9E15'
                      : 'white',
                    borderColor: selectedTime[selectedDate]?.includes(timeslot)
                      ? '#FF9E15'
                      : '#E6E5F0',
                  }}
                >
                  {formattedStartTime}
                </Box>
              );
            }

            return null;
          })}
        </Flex>
        <Button
          mt={10}
          bg="button.60"
          _hover={{ bg: '#000033' }}
          _active={{ bg: '#000033' }}
          onClick={handleSubmit}
          color="white"
          ml={'260'}
          isDisabled={!hasSelectedTime()} // Disable the button if no times are selected
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SetAvailabilityScreen;

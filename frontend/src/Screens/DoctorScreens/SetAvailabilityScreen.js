import React, { useEffect, useState } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Text, Flex, Box, Icon, HStack } from '@chakra-ui/react';

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
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const { loading, data, error } = useSelector(store => store.patientAppt);
  const [selectedTime, setSelectedTime] = useState({});

  const handleNextDates = () => {
    const nextStartDate = new Date(startDate);
    nextStartDate.setDate(startDate.getDate() + 1);
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
    setSelectedDate(date.toLocaleDateString(undefined, { timeZone: 'UTC' }));
    setSelectedTime(prevSelectedTime => {
      const updatedTime = { ...prevSelectedTime };

      if (!updatedTime[selectedDate]) {
        updatedTime[selectedDate] = [];
      }

      return updatedTime;
    });
  };

  // const handleSlotClick = timeSlot => {
  // selectedTime.map(slot=>slot.date===selectedDate?setSelectedTime([...slot,{date:selectedDate,time:[...slot.time,timeSlot]}]))
  // };
  const handleSlotClick = timeSlot => {
    setSelectedTime(prevSelectedTime => {
      const updatedTime = { ...prevSelectedTime };

      if (!updatedTime[selectedDate]) {
        updatedTime[selectedDate] = [];
      }

      updatedTime[selectedDate] = [...updatedTime[selectedDate], timeSlot];

      return updatedTime;
    });
  };
  useEffect(() => {
    console.log('Selected Date ', selectedDate);
    if (selectedTime[selectedDate] && selectedTime[selectedDate].length > 0) {
      console.log('Selected Time', selectedTime[selectedDate]);
    }
  }, [selectedDate, selectedTime]);

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
                  cursor={
                    selectedTime[selectedDate]?.includes(timeslot)
                      ? 'not-allowed'
                      : 'pointer'
                  }
                  _hover={{
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    borderColor: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'initial'
                      : '#FF9E15',
                    transition: 'all 0.5s ease-in-out',
                  }}
                  fontSize={14}
                  fontWeight={600}
                  onClick={() => {
                    if (!selectedTime[selectedDate]?.includes(timeslot)) {
                      handleSlotClick(timeslot);
                    }
                  }}
                  style={{
                    color: selectedTime[selectedDate]?.includes(timeslot)
                      ? 'gray'
                      : 'black',
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
        <Flex flexWrap="wrap" mt={47} ml="44px">
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
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default SetAvailabilityScreen;

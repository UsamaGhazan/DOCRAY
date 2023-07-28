import React, { useState } from 'react';
import { IconButton, Text, Flex, Box } from '@chakra-ui/react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const formatDate = date => {
  const options = { month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};
const formatTime = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const DateBox = ({ availableTimeSlots }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
    setSelectedDate(date);
  };

  return (
    <Box
      width="742px"
      height="71px"
      bg="gray.200"
      borderRadius="md"
      p={4}
      ml="388px"
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
              fontSize="lg"
              fontWeight={
                selectedDate === date.toDateString() ? 'bold' : 'normal'
              }
              mx={2}
              cursor="pointer"
              onClick={() => handleDateClick(date.toDateString())}
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
          <Text fontSize="lg" fontWeight="bold">
            Start Times for {selectedDate}:
          </Text>
          {availableTimeSlots.map((timeslot, index) => {
            const { startTime } = timeslot;

            const startTimeDate = new Date(startTime);
            if (startTimeDate.toDateString() === selectedDate) {
              const formattedStartTime = formatTime(startTimeDate);
              return (
                <Text key={index} mt={2}>
                  {formattedStartTime}
                </Text>
              );
            }
            return null;
          })}
        </Box>
      )}
    </Box>
  );
};

export default DateBox;

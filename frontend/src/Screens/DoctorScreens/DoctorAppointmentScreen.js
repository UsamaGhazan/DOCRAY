import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const DoctorAppointmentScreen = () => {
  return (
    <>
      <section className="docApptScreen">
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Box w={1200} h="110px" border={'2px solid red'}></Box>
        </Box>
      </section>
    </>
  );
};

export default DoctorAppointmentScreen;

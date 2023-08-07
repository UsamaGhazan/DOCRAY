import {
  AiOutlineCalendar,
  AiOutlineVideoCameraAdd,
  AiTwotoneCalendar,
} from 'react-icons/ai';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const DoctorAppointmentScreen = () => {
  return (
    <>
      <section className="docApptScreen">
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Box w={1200} h="110px" border="2px solid red">
            <Grid templateColumns="auto 1fr" gap="4" alignItems="center" p="4">
              {/* Avatar */}
              <Avatar
                name="John Doe"
                src="https://via.placeholder.com/50"
                size="lg"
              />

              {/* Patient name and Date-time section */}
              <Flex align="center">
                <Flex direction="column">
                  {/* Patient name */}
                  <Text fontSize="lg" fontWeight="bold">
                    John Doe
                  </Text>
                  {/* Date and Time */}
                  <HStack mt="2" spacing={10}>
                    <HStack>
                      <Icon as={AiTwotoneCalendar} boxSize="5" />
                      <span fontSize="md"> August 8, 2023 - 2:30 PM</span>
                    </HStack>
                    <HStack>
                      <Icon as={AiOutlineVideoCameraAdd} boxSize="5" />
                      <span fontSize="md"> Online Video Consultation</span>
                    </HStack>
                  </HStack>
                </Flex>
              </Flex>
            </Grid>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default DoctorAppointmentScreen;

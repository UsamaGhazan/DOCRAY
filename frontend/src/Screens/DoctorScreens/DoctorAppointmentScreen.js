import {
  AiOutlineCalendar,
  AiOutlineVideoCameraAdd,
  AiTwotoneCalendar,
} from 'react-icons/ai';
import {
  Avatar,
  Box,
  Button,
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
    <Box ml={{ base: 0, md: 60 }} p="4">
      <Box w={1200} h="110px" border="2px solid red" borderRadius="8px">
        <Grid templateColumns="auto 1fr auto" gap="4" alignItems="center" p="4">
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
                  <Icon as={AiOutlineCalendar} boxSize="5" />
                  <span fontSize="md"> August 8, 2023 - 2:30 PM</span>
                </HStack>
                <HStack>
                  <Icon as={AiOutlineVideoCameraAdd} boxSize="5" />
                  <span fontSize="md"> Online Video Consultation</span>
                </HStack>
              </HStack>
            </Flex>
          </Flex>

          {/* Cancel Appointment Button */}
          <Button
            bg="#000066"
            color="white"
            size="md"
            _hover={{ bg: '#000066' }}
            mr={10}
            mt={3}
          >
            Cancel Appointment
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};
export default DoctorAppointmentScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../Features/DoctorFeature/appointmentDetailSlice';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Text,
  Spinner,
} from '@chakra-ui/react';

const DoctorAppointmentScreen = () => {
  const dispatch = useDispatch();
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  const { loading, error, appointments } = useSelector(
    store => store.appointmentDetails
  );

  useEffect(() => {
    dispatch(getAppointments(doctorInfo._id));
  }, [doctorInfo._id, dispatch]);

  const formatDateAndTime = timestamp => {
    const date = new Date(timestamp);
    const optionsDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return { formattedDate, formattedTime };
  };

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      {loading ? (
        <Spinner />
      ) : (
        <Box
          w={1200}
          h="110px"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius="6px"
          boxShadow="md"
        >
          {appointments &&
            appointments.map(info => {
              const { formattedDate, formattedTime } = formatDateAndTime(
                info.startTime
              );

              return (
                <Grid
                  key={info._id}
                  templateColumns="auto 1fr auto"
                  gap="4"
                  alignItems="center"
                  p="4"
                >
                  <Avatar
                    name={info.patientName}
                    src="/images/patient1.jpg"
                    size="lg"
                  />

                  <Flex align="center">
                    <Flex direction="column">
                      <Text fontSize="lg" fontWeight="bold">
                        {info.patientName}
                      </Text>
                      <HStack
                        mt="2"
                        spacing={10}
                        fontSize="sm"
                        color="gray.600"
                      >
                        <HStack>
                          <Icon as={AiOutlineCalendar} boxSize="5" />
                          <span fontSize="sm">
                            {formattedDate}-{formattedTime}
                          </span>
                        </HStack>
                        <HStack fontSize="sm" color="gray.600">
                          <Icon as={AiOutlineVideoCameraAdd} boxSize="5" />
                          <span fontSize="md">Online Video Consultation</span>
                        </HStack>
                      </HStack>
                    </Flex>
                  </Flex>

                  {/* Cancel Appointment Button */}
                  <Button
                    bg="#000066"
                    color="white"
                    size="md"
                    _hover={{
                      transition: 'background-color 0.3s ease-in-out',

                      bg: '#3333CC',
                    }}
                    mr={10}
                    mt={3}
                  >
                    Cancel Appointment
                  </Button>
                </Grid>
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default DoctorAppointmentScreen;

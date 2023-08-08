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
  return (
    <>
      <Text ml="275px" fontWeight={600} mt={10}>
        Upcomming
      </Text>
      <Box
        bg="
#f7f8fb"
        w="100%"
        h="100vh"
      >
        {loading ? (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            {appointments &&
              appointments.map(info => {
                return info.feePayed ? (
                  <Box
                    w={1200}
                    h="110px"
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="gray.200"
                    borderRadius="6px"
                    boxShadow="md"
                    ml="275px"
                    mt="25px"
                    key={info._id}
                  >
                    <Grid
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
                                {formatDate(info.startTime)}-
                                {formatTime(info.startTime)}
                              </span>
                            </HStack>
                            <HStack fontSize="sm" color="gray.600">
                              <Icon as={AiOutlineVideoCameraAdd} boxSize="5" />
                              <span fontSize="md">
                                Online Video Consultation
                              </span>
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
                  </Box>
                ) : null;
              })}
          </>
        )}
      </Box>
    </>
  );
};

export default DoctorAppointmentScreen;

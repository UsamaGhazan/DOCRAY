import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../Features/DoctorFeature/appointmentDetailSlice';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { APPOINTMENT_RESET } from '../../Features/DoctorFeature/appointmentDetailSlice';
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
import { Link as RouterLink } from 'react-router-dom';
import { cancelAppointment } from '../../Features/DoctorFeature/CancelAppointmentSlice';

const DoctorAppointmentScreen = () => {
  const dispatch = useDispatch();
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  const { loading, error, appointments } = useSelector(
    store => store.appointmentDetails
  );
  const {
    loading: cancelLoading,
    error: cancelError,
    message,
  } = useSelector(store => store.cancelAppointment);

  console.log('message ', message);
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

  const handleCancelAppointment = id => {
    dispatch(cancelAppointment(id));
    dispatch(APPOINTMENT_RESET(id));
  };
  return (
    <>
      <HStack mt={10} spacing={890}>
        <Text ml="275px" fontWeight={600}>
          Upcomming
        </Text>
        <Button
          as={RouterLink}
          to="/setAvailability"
          marginLeft="17px"
          bg="#ff9e24"
          _hover={{ bg: '#faa63a' }}
          _active={{ bg: '#faa63a' }}
          color={'white'}
        >
          Set Availability
        </Button>
      </HStack>

      <Box bg="#f7f8fb" w="100%" h="100vh">
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
                        src={info.patientimage}
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
                          bg: '#000044',
                        }}
                        mr={10}
                        mt={3}
                        onClick={() => handleCancelAppointment(info._id)}
                      >
                        {cancelLoading ? (
                          <Spinner />
                        ) : (
                          <Box>Cancel Appointment</Box>
                        )}
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

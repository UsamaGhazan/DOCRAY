import {
  Box,
  Flex,
  Grid,
  Avatar,
  Text,
  HStack,
  Icon,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { getAppointmentsList } from '../Features/AdminFeatures/getAllAppointmentsSlice';
const AllAppointmentsScreen = () => {
  const dispatch = useDispatch();

  const { adminInfo } = useSelector(store => store.adminLogin);
  const { loading, error, appointments } = useSelector(
    store => store.allAppointments
  );

  const formatDate = date => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = date => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Using 12-hour format (AM/PM)
      timeZone: 'UTC', // Setting the timeZone option to 'UTC' since our input date is in UTC
    };

    const utcDate = new Date(date);
    const localTime = utcDate.toLocaleString(undefined, options);
    return localTime;
  };

  useEffect(() => {
    if (adminInfo?._id) {
      // Checking if patientInfo._id is defined
      dispatch(getAppointmentsList());
    }
  }, [dispatch, adminInfo]);

  return (
    <>
      <Box bg="#f7f8fb" w="100%" h="100vh">
        {loading ? (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            {appointments &&
              appointments.map(info => {
                // Converting info.startTime to the local time zone
                const startTime = new Date(info.startTime);
                startTime.setTime(
                  startTime.getTime() +
                    startTime.getTimezoneOffset() * 60 * 1000
                ); // Adjusting for the local time zone

                return info.feePayed ? (
                  <Box
                    w={1200}
                    h="110px"
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="gray.200"
                    borderRadius="6px"
                    boxShadow="md"
                    ml="290px"
                    mt="75px"
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

export default AllAppointmentsScreen;

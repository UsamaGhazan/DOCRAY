import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../Features/DoctorFeature/appointmentDetailSlice';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { APPOINTMENT_RESET } from '../../Features/DoctorFeature/appointmentDetailSlice';
import { CANCELLATION_RESET } from '../../Features/DoctorFeature/CancelAppointmentSlice';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { cancelAppointment } from '../../Features/DoctorFeature/CancelAppointmentSlice';

const DoctorAppointmentScreen = () => {
  const dispatch = useDispatch();
  const [successAlert, setSuccessAlert] = useState(false);

  const { doctorInfo } = useSelector(store => store.doctorLogin);
  const { loading, error, appointments } = useSelector(
    store => store.appointmentDetails
  );
  const {
    loading: cancelLoading,
    error: cancelError,
    message,
  } = useSelector(store => store.cancelAppointment);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    dispatch(getAppointments(doctorInfo._id));
  }, [doctorInfo._id, dispatch]);

  useEffect(() => {
    if (message && message.message) {
      setSuccessAlert(true);

      const timeout = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(CANCELLATION_RESET());
      }, 3000);

      // Cleanup the timeout when the component unmounts or when the alert is hidden
      return () => clearTimeout(timeout);
    }
  }, [message]);
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

  const handleConfirm = id => {
    handleCancelAppointment(id);
    onClose();
  };
  return (
    <>
      <div className="alert-overlay">
        {successAlert && (
          <Alert
            ml="388px"
            status="success"
            className={successAlert ? 'fade-in-slide-down' : ''}
          >
            <AlertIcon />
            <AlertDescription>{message && message.message}</AlertDescription>
          </Alert>
        )}
      </div>
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
                        onClick={onOpen}
                      >
                        Cancel Appointment
                      </Button>
                    </Grid>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Are you sure you want to cancel appointment?
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <HStack ml={'125px'}>
                            <Button
                              color={'white'}
                              _hover={{ bg: '#000033' }}
                              _active={{ bg: '#000033' }}
                              bg={'#000066'}
                              width={'80px'}
                              onClick={() => handleConfirm(info._id)}
                            >
                              {cancelLoading ? <Spinner /> : <Box>Yes</Box>}
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </HStack>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
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

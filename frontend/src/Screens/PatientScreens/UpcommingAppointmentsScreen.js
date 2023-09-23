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
import { getUpcommingAppointments } from '../../Features/PatientFeature/upcommingAppointmentSlice';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import {
  CANCELLATION_RESET,
  cancelAppointment,
} from '../../Features/DoctorFeature/CancelAppointmentSlice';
import { APPOINTMENT_RESET } from '../../Features/DoctorFeature/appointmentListSlice';
const UpcommingAppointmentsScreen = () => {
  const dispatch = useDispatch();
  const [successAlert, setSuccessAlert] = useState(false);

  const { patientInfo } = useSelector(store => store.patientLogin);
  const { loading, error, appointments } = useSelector(
    store => store.upcommingAppointments
  );
  const {
    loading: cancelLoading,
    error: cancelError,
    message,
  } = useSelector(store => store.cancelAppointment);
  const formatDate = date => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatTime = date => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Using 12-hour format (AM/PM)
      timeZone: 'UTC', // Set the timeZone option to 'UTC' since our input date is in UTC
    };

    const utcDate = new Date(date);
    const localTime = utcDate.toLocaleString(undefined, options);
    return localTime;
  };

  useEffect(() => {
    if (patientInfo?._id) {
      // Checking if patientInfo._id is defined
      dispatch(getUpcommingAppointments(patientInfo._id));
    }
  }, [dispatch, patientInfo, patientInfo?._id]);
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
  }, [dispatch, message]);
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
      <Box bg="#f7f8fb" w="100%" h="100vh">
        {loading ? (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            {appointments.map(info => {
              const today = new Date();

              // Converting info.startTime to Date object
              const startTime = new Date(info.startTime);

              // Checking if the appointment is today and the time has not passed
              const isTodayAndNotPassed =
                startTime.getDate() === today.getDate() &&
                startTime.getMonth() === today.getMonth() &&
                startTime.getFullYear() === today.getFullYear() &&
                startTime >= today;
              return info.feePayed ? (
                <Box
                  w={1200}
                  h="110px"
                  borderWidth="2px"
                  borderStyle="solid"
                  borderColor="gray.200"
                  borderRadius="6px"
                  boxShadow="md"
                  ml="175px"
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
                            <span fontSize="md">Online Video Consultation</span>
                          </HStack>
                        </HStack>
                      </Flex>
                    </Flex>
                    {isTodayAndNotPassed ? (
                      <Button
                        bg="#ff9e24"
                        color="white"
                        size="md"
                        _hover={{
                          transition: 'background-color 0.3s ease-in-out',
                          bg: '#000044',
                        }}
                        mr={10}
                        mt={3}
                      >
                        Chat Now
                      </Button>
                    ) : (
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
                    )}
                  </Grid>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>
                        Are you sure you want to cancel the appointment?
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

export default UpcommingAppointmentsScreen;

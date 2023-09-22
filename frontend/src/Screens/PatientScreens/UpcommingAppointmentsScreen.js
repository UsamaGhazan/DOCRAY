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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcommingAppointments } from '../../Features/PatientFeature/upcommingAppointmentSlice';
import { AiOutlineCalendar, AiOutlineVideoCameraAdd } from 'react-icons/ai';

const UpcommingAppointmentsScreen = () => {
  const dispatch = useDispatch();
  const { patientInfo } = useSelector(store => store.patientLogin);
  const { loading, error, appointments } = useSelector(
    store => store.upcommingAppointments
  );

  const formatDate = date => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    if (patientInfo._id) {
      // Check if patientInfo._id is defined
      dispatch(getUpcommingAppointments(patientInfo._id));
    }
  }, [dispatch, patientInfo._id]);

  return (
    <Box bg="#f7f8fb" w="100%" h="100vh">
      {loading ? (
        <Flex alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {appointments.map(info => {
            const today = new Date(); // Get the current date and time

            // Convert info.startTime to Date object
            const startTime = new Date(info.startTime);

            // Check if the appointment is today and the time has not passed
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
                          <span fontSize="md">Online Video Consultation</span>
                        </HStack>
                      </HStack>
                    </Flex>
                  </Flex>
                  {isTodayAndNotPassed ? (
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
                    >
                      Chat
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
                          // onClick={() => handleConfirm(info._id)}
                        >
                          {/* {cancelLoading ? <Spinner /> : <Box>Yes</Box>} */}
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
  );
};

export default UpcommingAppointmentsScreen;

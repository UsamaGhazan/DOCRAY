import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {
  Button,
  Box,
  Heading,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { getDoctorDetails } from '../Features/DoctorFeature/doctorDetailSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const [temp, setTemp] = useState({
    name: 'Usama',
    charges: 100,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);

  // ...

  const makePayment = async token => {
    console.log(temp);
    const body = {
      token,
      doctor: temp, // Use "doctor" instead of "temp"
    };

    try {
      const response = await axios.post('/payment', body);
      console.log('RESPONSE ', response);
      const data = response.data; // Get the response data
      const { status } = response;
      console.log(status, data);

      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    // Close the modal and navigate to another page
    setIsModalOpen(false);
    navigate('/some-other-page');
  };

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      p={4}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h1" size="xl" mb={4}>
        Payment
      </Heading>
      {loading ? (
        <Box textAlign="center">
          <Spinner size="lg" color="teal.500" />
          <Text mt={2}>Loading doctor details...</Text>
        </Box>
      ) : error ? (
        <Text color="red.500">Error: {error}</Text>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Doctor Details
          </Text>
          <Box border="1px solid gray" borderRadius="md" p={2} mb={4}>
            <Text>
              <strong>Name:</strong> {doctor?.name}
            </Text>
          </Box>
          <Box border="1px solid gray" borderRadius="md" p={2} mb={4}>
            <Text>
              <strong>Specialization:</strong> {doctor?.specialization}
            </Text>
          </Box>
          <Box border="1px solid gray" borderRadius="md" p={2} mb={4}>
            <Text>
              <strong>Charges:</strong> ${doctor?.charges}
            </Text>
          </Box>
          <StripeCheckout
            stripeKey="pk_test_51NBUB0SH4AJANTU5XiEHxXYpURC9qeSUkPWDuHFJ8gwlwIf3XOKcmBsDMOhh7NwTz3uhtrFZezpCLkzj8ByLBbCf00Mmu9i13b"
            token={makePayment}
            name="Pay Now"
            amount={doctor?.charges * 100}
          >
            <Button
              mt={4}
              colorScheme="teal"
              size="lg"
              w="100%"
              _hover={{ bg: 'teal.600' }}
            >
              Pay Now
            </Button>
          </StripeCheckout>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Payment Successful</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Fee Payed
                </Text>
                <Text>Your appointment has been booked.</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" onClick={closeModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default PaymentScreen;

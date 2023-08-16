import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stripe from 'react-stripe-checkout';
import axios from 'axios';
import { BOOK_PATIENT_RESET } from '../../Features/PatientFeature/bookPatientApptSlice';
import { getDoctorDetails } from '../../Features/DoctorFeature/doctorDetailSlice';

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

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  const { patientInfo } = useSelector(store => store.patientLogin);
  const {
    loading: patientLoading,
    data: successData,
    error: patientError,
  } = useSelector(store => store.patientAppt);
  console.log(successData);
  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [doctorId, dispatch]);
  //If user leaves the Paymentscreen without payment
  useEffect(() => {
    return () => {
      dispatch(BOOK_PATIENT_RESET());
    };
  }, [dispatch]);
  const handleToken = async (totalAmount, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${patientInfo.token}`,
      },
    };
    try {
      console.log('inside useeffect ', successData);
      const { data } = await axios.post(
        'http://localhost:5000/api/stripe/pay',
        {
          token: {
            email: token.email,
            source: token.id,
          },
          amount: Math.round(totalAmount),
          doctorId,
          formattedDate: successData.startTime,
        },
        config
      );
      console.log(data);
      if (data.last_payment_error === null) {
        dispatch(BOOK_PATIENT_RESET());
        navigate('/appointmentSuccess');
      }
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const tokenHandler = token => {
    handleToken(doctor.charges, token);
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
          <Box display="flex" justifyContent="center">
            <Stripe
              stripeKey="pk_test_51NBUB0SH4AJANTU5XiEHxXYpURC9qeSUkPWDuHFJ8gwlwIf3XOKcmBsDMOhh7NwTz3uhtrFZezpCLkzj8ByLBbCf00Mmu9i13b"
              token={tokenHandler}
            >
              <Button
                bg="#000066"
                size="lg"
                colorScheme="blue"
                _hover={{ bg: '#000033' }}
                _active={{ bg: '#000033' }}
              >
                Pay Now
              </Button>
            </Stripe>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PaymentScreen;

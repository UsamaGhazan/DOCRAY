import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../../Features/DoctorFeature/doctorDetailSlice';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Text,
  Avatar,
  Center,
  Spinner,
} from '@chakra-ui/react';
import PatientForm from '../../Components/PatientForm';

const BookAppointmentScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);

  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);

  return (
    <section className="bookAppointmentScreen">
      {error && <Box>{error}</Box>}
      <div>
        {loading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          <Box
            maxW="744px"
            h="124px"
            p="10px"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            display="flex"
            alignItems="center"
            marginLeft="388px"
            mt="30px"
          >
            {/* Avatar (Left Side) */}
            <Avatar size="lg" name={doctor.name} src={doctor.image} mr="10px" />

            {/* Doctor Information (Right Side) */}
            <Box>
              {/* Doctor Name */}
              <Text fontSize="lg" fontWeight="bold">
                {doctor.name}
              </Text>

              {/* Clinic Name */}
              <Text fontSize="md" color="gray.500" mb="2px">
                docRay Care Video Consultation (Online){' '}
              </Text>

              {/* Fee Amount */}
              <Text fontSize="md" color="green.500">
                Fee: ${doctor.charges}
              </Text>
            </Box>
          </Box>
        )}
      </div>
    </section>
  );
};

export default BookAppointmentScreen;

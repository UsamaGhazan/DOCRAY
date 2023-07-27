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
  // Function to format time as "hh:mm AM/PM"
  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  return (
    <section className="bookAppointmentScreen">
      {error && <Box>{error}</Box>}
      <div>
        {loading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
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
              <Avatar
                size="lg"
                name={doctor.name}
                src={doctor.image}
                mr="10px"
              />

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
                <Text fontSize="md">Fee: ${doctor.charges}</Text>
              </Box>
            </Box>
            <Box>
              {doctor.availableTimeSlots.map(timeslots => {
                const [startTime, endTime] = timeslots.split('-');
                const startDate = new Date(startTime); // Convert the start time to a Date object
                const endDate = new Date(endTime); // Convert the end time to a Date object

                // Get the full month name and the day of the month
                const readableStartDate = `${startDate.toLocaleString(
                  undefined,
                  {
                    month: 'long',
                  }
                )} ${startDate.getDate()}`;
                const readableStartTime = formatTime(startDate);

                const readableEndDate = `${endDate.toLocaleString(undefined, {
                  month: 'long',
                })} ${endDate.getDate()}`;
                const readableEndTime = formatTime(endDate);

                return (
                  <Box>
                    <p>readable start time</p>
                    {readableStartTime}
                    <p>readable end time</p>
                    {readableEndTime}
                    <p>readable start date </p>

                    {readableStartDate}
                    <p>readable end date </p>

                    {readableEndDate}
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </div>
    </section>
  );
};

export default BookAppointmentScreen;

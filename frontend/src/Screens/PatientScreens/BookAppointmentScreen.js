import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../../Features/DoctorFeature/doctorDetailSlice';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { Box, Text, Avatar, Spinner, Flex, Icon } from '@chakra-ui/react';
import DateBox from '../../Components/DatesBox';

const BookAppointmentScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  const [date, setDate] = useState('');

  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);

  return (
    <section
      className="bookAppointmentScreen"
      style={{ backgroundColor: '#f8f9fa' }}
    >
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
              <Avatar
                size="lg"
                name={doctor.name}
                src={doctor.image}
                mr="10px"
              />

              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {doctor.name}
                </Text>

                <Text fontSize="md" color="gray.500" mb="2px">
                  docRay Care Video Consultation (Online)
                </Text>

                <Text fontSize="md">Fee: ${doctor.charges}</Text>
              </Box>
            </Box>
            <DateBox availableTimeSlots={doctor.availableTimeSlots} />
          </>
        )}
      </div>
    </section>
  );
};

export default BookAppointmentScreen;

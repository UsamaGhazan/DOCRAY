import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../Features/DoctorFeature/doctorDetailSlice';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  HStack,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  VStack,
  Heading,
  Text,
  Spinner,
  Image,
  Button,
} from '@chakra-ui/react';
const DoctorDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);

  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);
  return (
    <section className="doctorDetailScreen">
      {loading ? (
        <div className="spinner-container">
          <Spinner size="xl" />
        </div>
      ) : (
        <Card w="1123px" h="290px" backgroundColor="#fff" mt="100px" ml="205px">
          <HStack spacing="50px">
            <Box ml="32px">
              <Avatar name={doctor.name} src={doctor.image} size="2xl" />
            </Box>
            <VStack align="flex-start" className="cardText" spacing="30px">
              <Box>
                <Text fontSize="26px" fontWeight={600} mt="21px">
                  {doctor.name}
                </Text>
                <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                  {doctor.specialization}
                </Text>
                <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                  {doctor.degree}
                </Text>
              </Box>
              <HStack mt="10px" spacing="50px">
                <VStack>
                  <Text fontSize="16px" color="#8c9196">
                    Experience
                  </Text>
                  <Text fontSize="18px" fontWeight="600">
                    {doctor.experience} years
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="16px" color="#8c9196">
                    Satisfied Patients
                  </Text>
                  <Text fontSize="18px" fontWeight="600" px="50px">
                    {Math.round(
                      (doctor.satisfied / doctor.patientsChecked) * 100
                    )}
                    % ({doctor.satisfied})
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <Button
              as={Link}
              to={`/payment/${doctor._id}`}
              color="brand.50"
              fontSize="14px"
              className="goldbtn bookbtn"
              position="absolute"
              right="0"
            >
              Book Appointment
            </Button>
          </HStack>
        </Card>
      )}
    </section>
  );
};

export default DoctorDetailScreen;

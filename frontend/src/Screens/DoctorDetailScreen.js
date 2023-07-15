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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
const DoctorDetailScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(store => store.doctorDetails);
  console.log(doctor);
  useEffect(() => {
    dispatch(getDoctorDetails(doctorId));
  }, [dispatch, doctorId]);
  return (
    <section className="doctorDetailScreen ">
      <VStack align="flex-start">
        {/* {loading ? (
        <div className="spinner-container">
          <Spinner size="xl" />
        </div>
      ) : ( */}
        <Card w="1123px" h="290px" backgroundColor="#fff" mt="100px" ml="50px">
          <HStack spacing="50px">
            <Box ml="32px">
              <Avatar
                name="Dr Jane Smith"
                src="/images/doctor2.jpg"
                size="2xl"
              />
            </Box>
            <VStack align="flex-start" className="cardText" spacing="30px">
              <Box>
                <Text fontSize="26px" fontWeight={600} mt="21px">
                  {/* {doctor.name} */}Dr Jane Smith
                </Text>
                <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                  {/* {doctor.specialization} */}Cardiologist M.B.B.S, M.D
                  (Cardiology)
                </Text>
                <Text fontSize="16px" lineHeight="21px" fontWeight="400">
                  {/* {doctor.degree} */} M.B.B.S., F.C.P.S. (Dermatology)
                </Text>
              </Box>
              <HStack mt="10px" spacing="50px">
                <VStack>
                  <Text fontSize="16px" color="#8c9196">
                    Experience
                  </Text>
                  <Text fontSize="18px" fontWeight="600">
                    {/* {doctor.experience} years */} 10 years
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="16px" color="#8c9196">
                    Satisfied Patients
                  </Text>
                  <Text fontSize="18px" fontWeight="600">
                    {/* {Math.round(
                      (doctor.satisfied / doctor.patientsChecked) * 100
                    )}
                    % ({doctor.satisfied}) */}
                    50% (10)
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="16px" color="#8c9196">
                    Area Name
                  </Text>
                  <Text fontSize="18px" fontWeight="600">
                    {/* {doctor.areaname} */}Johr Town
                  </Text>
                </VStack>
              </HStack>
              <VStack>Hello</VStack>
            </VStack>
          </HStack>
        </Card>
        <VStack align="flex-start">
          <h1>Reviews</h1>

          <Box>
            {/* {doctor.reviews.length === 0 && ( */}
            <Alert status="info">
              <AlertIcon />
              <AlertDescription>No Reviews available</AlertDescription>
            </Alert>
            {/* )} */}
          </Box>
        </VStack>
      </VStack>
    </section>
  );
};

export default DoctorDetailScreen;

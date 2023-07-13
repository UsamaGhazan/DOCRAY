import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

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

const DoctorCard = ({ doctor }) => {
  return (
    <Card
      as={Link}
      to={`/doctors/${doctor._id}`}
      key={doctor.id}
      w="1123px"
      h="422px"
      border="2px solid #E8E8E8"
      backgroundColor="#fff"
      mt="20px"
    >
      <HStack>
        <Box ml="32px">
          <Avatar name={doctor.name} src={doctor.image} size="xl" mt="10px" />
        </Box>
        <VStack align="flex-start" className="cardText" spacing="30px">
          <Box>
            <Text fontSize="18px" fontWeight={400} mt="21px">
              {doctor.name}
            </Text>
            <Text fontSize="14px" lineHeight="20px">
              {doctor.specialization}
            </Text>
            <Text fontSize="14px" lineHeight="20px">
              {doctor.degree}
            </Text>
          </Box>
          <HStack mt="10px">
            <VStack>
              <Text fontSize="14px" fontWeight="600">
                {doctor.experience} years
              </Text>
              <Text fontSize="12px" color="#8c9196">
                Experience
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="14px" fontWeight="600" px="50px">
                {Math.round((doctor.satisfied / doctor.patientsChecked) * 100)}%
                ({doctor.satisfied})
              </Text>
              <Text fontSize="12px" color="#8c9196">
                Satisfied Patients
              </Text>
            </VStack>
          </HStack>
          <HStack>
            <Box h="70px" w="327px" border="1px solid #000066" p="12px">
              {/* Additional content goes here */}
            </Box>
          </HStack>
        </VStack>
        <VStack position={'absolute'} right={10}>
          <Button
            as={Link}
            to={`/doctors/${doctor._id}`}
            variant="outline"
            colorScheme="brand.50"
            size="lg"
            fontSize="14px"
            className="bookbtn"
          >
            View Details{' '}
          </Button>

          <Button
            as={Link}
            to={`/payment/${doctor._id}`}
            color="brand.50"
            fontSize="14px"
            className="goldbtn bookbtn"
          >
            Book Appointment
          </Button>
        </VStack>
      </HStack>
    </Card>
  );
};

export default DoctorCard;

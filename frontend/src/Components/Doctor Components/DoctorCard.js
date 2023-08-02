import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineVideoCamera, AiOutlinePercentage } from 'react-icons/ai';
import {
  Card,
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';

const DoctorCard = ({ doctor }) => {
  const discountedCharges = Math.floor(
    doctor.charges - (doctor.charges * 30) / 100
  );

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
        <Box ml="32px" mb="160px">
          <Avatar name={doctor.name} src={doctor.image} size="xl" />
        </Box>
        <VStack align="flex-start" className="cardText" spacing="30px">
          <Box mt="10px">
            <Text fontSize="18px" fontWeight={400} mt="0px" mb="4px">
              {doctor.name}
            </Text>
            <Text fontSize="14px" lineHeight="20px" mb="4px">
              {doctor.specialization}
            </Text>
            <Text fontSize="14px" lineHeight="20px" mb="4px">
              {doctor.degree}
            </Text>
          </Box>
          <HStack mt="10px" spacing="55px">
            <VStack>
              <Text fontSize="14px" fontWeight="600">
                {doctor.experience} years
              </Text>
              <Text fontSize="12px" color="#8c9196">
                Experience
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="14px" fontWeight="600">
                {Math.round((doctor.satisfied / doctor.patientsChecked) * 100)}%
                ({doctor.satisfied})
              </Text>
              <Text fontSize="12px" color="#8c9196">
                Satisfied Patients
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="14px" fontWeight="600">
                {doctor.areaname}
              </Text>
              <Text fontSize="12px" color="#8c9196">
                Area Name
              </Text>
            </VStack>
          </HStack>
          <HStack>
            <VStack spacing="0px" align="stretch" mt="25px">
              <Box
                h="70px"
                w="327px"
                border="1px solid #000066"
                p="12px"
                marginBottom="0px"
                borderRadius="7px 7px 0 0"
              >
                <HStack
                  fontWeight="600"
                  fontSize="14px"
                  lineHeight="21px"
                  justifyContent="center"
                >
                  <AiOutlineVideoCamera />
                  <Box>docRay Care Online Consultation</Box>
                </HStack>
                <HStack
                  fontSize="14px"
                  fontWeight="600"
                  spacing="50px"
                  justifyContent="center"
                >
                  <Box>Charges</Box>
                  <Box textDecoration="line-through" color="#696D71">
                    ${doctor.charges}
                  </Box>
                  <Box>${discountedCharges}</Box>
                </HStack>
              </Box>
              <Box
                h="26px"
                w="327px"
                border="1px solid #000066"
                p="4px"
                backgroundColor="#3333ac"
                borderRadius="0 0 7px 7px"
              >
                <HStack
                  fontSize="12px"
                  fontWeight="600"
                  color="#FFFFFF"
                  textAlign="center"
                  justifyContent="center"
                >
                  <AiOutlinePercentage />
                  <Box>docRay care exclusive discount</Box>
                </HStack>
              </Box>
            </VStack>
            <Box
              h="70px"
              w="327px"
              border="1px solid #E5E5F0"
              p="12px"
              borderRadius="7px "
            >
              <HStack
                fontWeight="600"
                fontSize="14px"
                lineHeight="21px"
                justifyContent="center"
              >
                <Box>
                  {doctor.clinicname}({doctor.areaname})
                </Box>
              </HStack>
              <HStack
                fontSize="14px"
                fontWeight="600"
                spacing="50px"
                justifyContent="center"
              >
                <Box>Charges</Box>
                <Box>${doctor.charges}</Box>
              </HStack>
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
            to={`/doctors/bookAppointment/${doctor._id}`}
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

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Progress,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const ReportGenerationScreen = () => {
  const {
    loading: detectionLoading,
    error: detectionError,
    data,
  } = useSelector(store => store.pneumoniaDetection);
  const prediction = data?.prediction?.[0] ?? 0;

  let circleColor = '';
  if (prediction < 0.2) {
    circleColor = 'green.500';
  } else if (prediction > 0.8) {
    circleColor = 'red.500';
  }
  return (
    <div
      style={{ backgroundColor: '#f5f5f5', padding: '20px', height: '100vh' }}
    >
      <HStack>
        <CircularProgress
          size="300px"
          value={prediction * 100}
          color={circleColor}
          thickness="10px"
        >
          <CircularProgressLabel fontSize={'20px'} fontWeight={600}>
            Pneumonia Detected!
          </CircularProgressLabel>
        </CircularProgress>
        <Box ml={'436px'}>
          {/* Patient Avatar */}
          <Avatar
            name="Patient Name"
            src="URL_OF_PATIENT_AVATAR_IMAGE" // Replace with the actual image URL
            size="xl"
            mb="20px"
          />

          <Heading fontSize={'42px'} fontWeight={600} color={'#383E35'}>
            AI-Powered Chest X-Ray Analysis
          </Heading>
          {/* ... Other content ... */}

          {/* Patient Information Table */}
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Test Result</Th>
                <Th>Confidence Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Patient Name</Td> {/* Replace with actual patient name */}
                <Td>Positive</Td> {/* Replace with actual test result */}
                <Td>0.85</Td> {/* Replace with actual confidence score */}
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </HStack>
    </div>
  );
};

export default ReportGenerationScreen;

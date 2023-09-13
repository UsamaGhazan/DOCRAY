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
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const ReportGenerationScreen = () => {
  const {
    loading: detectionLoading,
    error: detectionError,
    data,
  } = useSelector(store => store.pneumoniaDetection);

  const { patientInfo } = useSelector(store => store.patientLogin);

  const predictionScore = data?.prediction?.[0] ?? 0;
  console.log(predictionScore);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  const currentDate = new Date().toLocaleDateString('en-US', options);

  let circleColor = '';
  if (predictionScore < 0.8) {
    circleColor = 'green.500';
  } else if (predictionScore > 0.8) {
    circleColor = 'red.500';
  }
  return (
    <div
      style={{ backgroundColor: '#f5f5f5', padding: '20px', height: '100vh' }}
    >
      <VStack>
        <Box>
          <VStack>
            {/* Patient Avatar */}
            <Avatar
              name={patientInfo.name}
              src={patientInfo.image} // Replace with the actual image URL
              size="xl"
              mb="20px"
            />

            <Heading fontSize={'42px'} fontWeight={600} color={'#383E35'}>
              AI-Powered Chest X-Ray Analysis
            </Heading>
          </VStack>

          {/* Patient Information Table */}
          <Table variant="striped" colorScheme="green">
            <Thead>
              <Tr>
                <Th>PATIENT NAME</Th>
                <Th>TEST RESULT</Th>
                <Th>PREDICTION SCORE</Th>
                <Th>Date of Examination</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Diagnosis</Th>
                <Th>Report Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{patientInfo.name}</Td>
                <Td>{predictionScore > 0.2 ? 'Positive' : 'Negative'}</Td>
                <Td>{predictionScore[0]}</Td>
                <Td>{currentDate}</Td>
                <Td></Td>
                <Td>Male</Td>
                <Td>Pneumonia</Td>
                <Td>Completed</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <CircularProgress
          size="300px"
          value={
            predictionScore > 0.8
              ? predictionScore * 100
              : 100 - predictionScore * 100
          }
          color={circleColor}
          thickness="10px"
        >
          <CircularProgressLabel
            fontSize={'20px'}
            fontWeight={600}
            fontFamily="heading"
          >
            {predictionScore[0] < 0.2
              ? 'Pneumonia Detected!'
              : 'No Disease Detected!'}
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </div>
  );
};

export default ReportGenerationScreen;

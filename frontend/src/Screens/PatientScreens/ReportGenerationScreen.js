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
import { Link as RouterLink } from 'react-router-dom';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReportGenerationScreen = () => {
  const {
    loading: detectionLoading,
    error: detectionError,
    data,
  } = useSelector(store => store.pneumoniaDetection);

  const { patientInfo } = useSelector(store => store.patientLogin);
  const navigate = useNavigate();

  const predictionScore = data?.pneumonia_prediction?.[0] ?? 0;
  console.log(predictionScore);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  const currentDate = new Date().toLocaleDateString('en-US', options);
  useEffect(() => {
    if (!patientInfo) {
      navigate('/login');
    }
  }, [navigate, patientInfo]);
  const dobString = patientInfo ? patientInfo.dob : '';

  // Parse the DOB string into a Date object
  const dob = dobString ? new Date(dobString) : null;

  // Calculate the current date
  const todayDate = new Date();

  // Calculate the age
  const age = dob ? todayDate.getFullYear() - dob.getFullYear() : null;

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
        {/* Patient Avatar */}
        <Heading fontSize={'42px'} fontWeight={600} color={'#383E35'}>
          AI-Powered Chest X-Ray Analysis
        </Heading>
        <Avatar
          name={patientInfo && patientInfo.name}
          src={patientInfo && patientInfo.image} // Replace with the actual image URL
          size="xl"
          mb="20px"
        />
      </VStack>
      <HStack mt={10} spacing={'200px'}>
        <VStack>
          <CircularProgress
            ml={'235px'}
            size="300px"
            mb={'200px'}
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
              color={'#000080'}
            >
              {predictionScore[0] < 0.8
                ? 'No Disease Detected!'
                : 'Pneumonia Detected!'}
            </CircularProgressLabel>
          </CircularProgress>
          <Button
            as={RouterLink}
            to={`/modelInfo`}
            size="lg"
            bg={'#000066'}
            color={'white'}
            position={'absolute'}
            bottom={10}
            right={1040}
            _hover={{ bg: '#000044' }}
          >
            More Info!
          </Button>

          <Button
            as={RouterLink}
            to={`/pneumoniaDoctors`}
            size="lg"
            bg={'#ff9e24'}
            color={'white'}
            position={'absolute'}
            bottom={100}
            right={980}
            _hover={{ bg: '#faa63a' }}
          >
            Book Video Consultation
          </Button>
        </VStack>
        <Box>
          {/* Patient Information Table */}
          <Table
            variant="striped"
            bg="#C6F6D5"
            fontFamily={'heading'}
            width={'500px'}
            color={'#000080'}
          >
            <Tbody>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    PATIENT NAME:
                  </Heading>
                </Td>
                <Td>{patientInfo && patientInfo.name}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    TEST RESULT:
                  </Heading>
                </Td>
                <Td>{predictionScore > 0.8 ? 'Positive' : 'Negative'}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    PREDICTION SCORE:
                  </Heading>
                </Td>
                <Td>{predictionScore[0] && predictionScore[0].toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    Date of Examination:
                  </Heading>
                </Td>
                <Td>{currentDate}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    Age:
                  </Heading>
                </Td>
                <Td>{age} Years</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    Gender:
                  </Heading>
                </Td>
                <Td>Male</Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    Diagnosis:
                  </Heading>
                </Td>
                <Td>
                  {predictionScore < 0.8
                    ? 'No Pneumonia Detected'
                    : 'Pneumonia'}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="sm">
                    Report Status:
                  </Heading>
                </Td>
                <Td>Completed</Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Disclaimer */}
          <Text fontSize="sm" mt={4}>
            **Disclaimer:** This report is for informational purposes only and
            should not be used as a substitute for professional medical advice.
            Please consult with a qualified healthcare provider for any medical
            concerns or questions.
          </Text>
        </Box>
        <HStack alignSelf={'start'}></HStack>
      </HStack>
    </div>
  );
};

export default ReportGenerationScreen;

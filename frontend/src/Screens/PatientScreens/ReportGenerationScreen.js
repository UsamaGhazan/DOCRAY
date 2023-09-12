import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
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
  console.log(data);

  return (
    <div
      style={{ backgroundColor: '#f5f5f5', padding: '20px', height: '100vh' }}
    >
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

        {/* Patient Symptoms */}
        <Heading fontSize="24px" mt="20px">
          Patient Symptoms
        </Heading>
        <Text>
          The patient reported the following symptoms: [List of symptoms].
        </Text>

        {/* Diagnosis Details */}
        <Heading fontSize="24px" mt="20px">
          Diagnosis Details
        </Heading>
        <Text>
          [Provide detailed information about the diagnosis, including any
          findings from the chest X-ray or other tests. Explain the reasons for
          the test result and any relevant medical information.]
        </Text>

        {/* Recommendations */}
        <Heading fontSize="24px" mt="20px">
          Recommendations
        </Heading>
        <Text>
          Based on the diagnosis, the following recommendations are provided:
          <ul>
            <li>Consult with a healthcare professional immediately.</li>
            <li>
              Begin appropriate treatment, which may include [treatment
              options].
            </li>
            <li>
              Monitor symptoms closely and report any changes to your healthcare
              provider.
            </li>
          </ul>
        </Text>

        {/* Next Steps */}
        <Heading fontSize="24px" mt="20px">
          Next Steps
        </Heading>
        <Text>
          Please take the following steps:
          <ul>
            <li>
              Contact [healthcare provider's name] at [contact information] to
              schedule an appointment.
            </li>
            <li>
              If you experience severe symptoms or breathing difficulties, seek
              immediate medical attention.
            </li>
          </ul>
        </Text>

        {/* Confidentiality */}
        <Text fontSize="14px" mt="20px">
          This medical report is confidential and should not be shared without
          proper authorization.
        </Text>

        {/* Date and Signature */}
        <Text fontSize="14px" mt="20px">
          Date: [Date of the report]
        </Text>
        <Text fontSize="14px">
          Signature: [Signature of the healthcare provider]
        </Text>
      </Box>
    </div>
  );
};

export default ReportGenerationScreen;

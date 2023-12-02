import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const pneumoniaSymptoms = [
  'Cough',
  'Shortness of Breath',
  'Chest Pain',
  'Fever',
  'Fatigue',
];

const tbSymptoms = [
  'Persistent Cough for more than 2 weeks',
  'Coughing up Blood',
  'Unintentional Weight Loss',
  'Feverish Sweats',
  'Loss of Appetite',
  'Chest Pain',
  'Breathing Difficulties',
];

const SymptomCheckerScreen = () => {
  const [pneumoniaResponses, setPneumoniaResponses] = useState(
    Array(pneumoniaSymptoms.length).fill(null)
  );
  const [tbResponses, setTbResponses] = useState(
    Array(tbSymptoms.length).fill(null)
  );
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRadioChange = (index, value, isPneumonia) => {
    const updatedResponses = isPneumonia
      ? [...pneumoniaResponses]
      : [...tbResponses];

    updatedResponses[index] = value === '1' ? 1 : 0;

    isPneumonia
      ? setPneumoniaResponses(updatedResponses)
      : setTbResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/patients/symptom-checker', {
        pneumoniaResponses,
        tbResponses,
      });
      setResult(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxW="xl" centerContent>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" mt={8}>
        <Heading as="h2" size="xl" mb={4}>
          Symptom Checker
        </Heading>
        <Text mb={4}>
          Answer the following questions to check the probability of having
          pneumonia or tuberculosis.
        </Text>
        <Stack spacing={4}>
          {pneumoniaSymptoms.map((symptom, index) => (
            <FormControl key={index}>
              <FormLabel>{symptom}</FormLabel>
              <RadioGroup onChange={e => handleRadioChange(index, e, true)}>
                <Stack direction="row">
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          ))}
          {tbSymptoms.map((symptom, index) => (
            <FormControl key={index}>
              <FormLabel>{symptom}</FormLabel>
              <RadioGroup onChange={e => handleRadioChange(index, e, false)}>
                <Stack direction="row">
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          ))}
        </Stack>
        <Button
          bg="brand.60"
          color="white"
          _hover={{ bg: '#000033' }}
          _active={{ bg: '#000033' }}
          mt={4}
          onClick={handleSubmit}
        >
          Check Symptoms
        </Button>
        {result && result.pneumoniaProbability !== undefined && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">Diagnosis</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  The probability of having pneumonia is{' '}
                  <Heading size={'sm'}>
                    {(result.pneumoniaProbability.toFixed(2) * 100).toFixed(2)}
                    %.
                  </Heading>
                  and Tubercluosis is{' '}
                  <Heading size={'sm'}>
                    {' '}
                    {(result.tbProbability.toFixed(2) * 100).toFixed(2)}%.
                  </Heading>
                </Text>
                <Button
                  as={Link}
                  to={'/pneumoniaDoctors'}
                  size="md"
                  lineHeight="1.5"
                  borderRadius="4px"
                  bg={'brand.50'}
                  color={'white'}
                  _hover={{ bg: '#faa63a' }}
                  _active={{ bg: '#faa63a' }}
                  mt={4}
                  ml={'100px'}
                >
                  Book Appointment
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Container>
  );
};

export default SymptomCheckerScreen;

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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';

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

  const handleRadioChange = (index, value, isPneumonia) => {
    if (isPneumonia) {
      const updatedResponses = [...pneumoniaResponses];
      updatedResponses[index] = value === '1' ? 1 : 0;
      setPneumoniaResponses(updatedResponses);
    } else {
      const updatedResponses = [...tbResponses];
      updatedResponses[index] = value === '1' ? 1 : 0;
      setTbResponses(updatedResponses);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/patients/symptom-checker', {
        pneumoniaResponses,
        tbResponses,
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
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
        <Button bg="brand.60" color="white" mt={4} onClick={handleSubmit}>
          Check Symptoms
        </Button>
        {result !== null &&
          typeof result !== 'undefined' &&
          result.probability !== undefined && (
            <Alert mt={4} status="info" borderRadius={8}>
              <AlertIcon />
              <Text>
                The probability of having a respiratory condition is{' '}
                {(result.probability.toFixed(2) * 100).toFixed(2)}%.
              </Text>
            </Alert>
          )}
      </Box>
    </Container>
  );
};

export default SymptomCheckerScreen;

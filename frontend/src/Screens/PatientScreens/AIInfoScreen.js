import React from 'react';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
} from '@chakra-ui/react';

const AIInfoScreen = () => {
  return (
    <Box
      p="4"
      maxWidth="600px"
      mx="auto"
      mt="2"
      textAlign="left"
      backgroundColor="white"
      boxShadow="md"
      borderRadius="md"
    >
      <Heading as="h1" size="xl" mb="4">
        AI-Powered Pneumonia Detection
      </Heading>
      <Text fontSize="lg">
        Our AI-powered system utilizes advanced machine learning algorithms to
        assist in the detection of pneumonia from chest X-ray images. Pneumonia
        is a common respiratory infection that can have serious health
        implications if not detected and treated promptly.
      </Text>
      <Text fontSize="lg" mt="4">
        Here's how our AI model works:
      </Text>
      <UnorderedList mt="4" fontSize="lg">
        <ListItem>
          <strong>Data Collection:</strong> We have curated a large dataset of
          chest X-ray images, including both normal and pneumonia-affected
          cases. These images serve as the foundation for training our AI model.
        </ListItem>
        <ListItem>
          <strong>Model Training:</strong> Our machine learning model is trained
          on this dataset using deep learning techniques. It learns to recognize
          patterns and features in the X-ray images that are indicative of
          pneumonia.
        </ListItem>
        <ListItem>
          <strong>Diagnostic Accuracy:</strong> The trained model can analyze
          new chest X-ray images and provide a prediction based on its learned
          knowledge. The prediction score indicates the likelihood of pneumonia.
          If the score surpasses a certain threshold, the model flags the X-ray
          for further review.
        </ListItem>
        <ListItem>
          <strong>Medical Professional Review:</strong> It's important to note
          that our AI system is designed to assist medical professionals, not
          replace them. When the AI model detects potential pneumonia, the X-ray
          is reviewed by a healthcare expert to confirm the diagnosis and
          recommend appropriate treatment.
        </ListItem>
      </UnorderedList>
      <Text fontSize="lg" mt="4">
        We are committed to improving healthcare outcomes through the use of
        cutting-edge technology. Our AI-powered system is part of our ongoing
        efforts to provide timely and accurate diagnostic support to medical
        practitioners.
      </Text>
      <Text fontSize="lg" mt="4">
        If you have any questions or concerns about our AI model or the
        diagnostic process, please feel free to reach out to our team.
      </Text>
    </Box>
  );
};

export default AIInfoScreen;

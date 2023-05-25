import React from 'react';
import { Box, Heading, Text, VStack, Link } from '@chakra-ui/react';

const AboutScreen = () => {
  return (
    <Box
      p={8}
      bg="gray.200"
      borderRadius="md"
      boxShadow="xl"
      maxW="800px"
      mx="auto"
    >
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" mb={4}>
          About Us
        </Heading>
        <Text fontSize="lg" textAlign="justify">
          Welcome to our website dedicated to pneumonia and tuberculosis
          detection using AI. We are passionate about leveraging the power of
          artificial intelligence to improve healthcare outcomes and provide
          accessible diagnostic solutions.
        </Text>
        <Text fontSize="lg" textAlign="justify">
          Our mission is to make early detection of pneumonia and tuberculosis
          more efficient and accurate. By utilizing AI algorithms, we analyze
          X-ray images to detect signs of these respiratory conditions,
          assisting healthcare professionals and patients in making informed
          decisions.
        </Text>
        <Text fontSize="lg" textAlign="justify">
          In addition to our AI-based diagnostic services, we provide a range of
          features to enhance the user experience. You can book appointments
          with experienced doctors, engage in secure chat consultations, search
          for doctors based on specialization, and access informative resources
          related to pneumonia and tuberculosis.
        </Text>
        <Text fontSize="lg" textAlign="justify">
          We are dedicated to maintaining the privacy and security of our users'
          data. Your uploaded X-ray images and personal information are handled
          with the utmost confidentiality and in compliance with applicable data
          protection regulations.
        </Text>
        <Text fontSize="lg" textAlign="justify">
          If you have any questions or feedback, please feel free to{' '}
          <Link color="blue.500" href="/contact">
            contact us
          </Link>
          . We are here to assist you and provide the best possible experience.
        </Text>
      </VStack>
    </Box>
  );
};

export default AboutScreen;

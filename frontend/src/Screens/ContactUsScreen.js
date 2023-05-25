import React from 'react';
import { Box, Heading, Text, VStack, Link, Button } from '@chakra-ui/react';

const ContactUsScreen = () => {
  return (
    <Box p={8} bg="gray.200" borderRadius="md">
      <VStack spacing={6} align="start">
        <Heading as="h1" size="xl" mb={4}>
          Contact Us
        </Heading>
        <Text fontSize="lg" textAlign="justify">
          We would love to hear from you! If you have any questions, feedback,
          or inquiries, please don't hesitate to reach out to us.
        </Text>
        <Text fontSize="lg" textAlign="justify">
          You can contact us through the following methods:
        </Text>
        <VStack spacing={4} align="start">
          <Box>
            <Text fontSize="lg">
              Email:{' '}
              <Link color="blue.500" href="mailto:info@example.com">
                info@example.com
              </Link>
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg">
              Phone:{' '}
              <Link color="blue.500" href="tel:+123456789">
                +1 234 567 89
              </Link>
            </Text>
          </Box>
          <Box>
            <Text fontSize="lg">
              Address: 123 Example Street, City, Country
            </Text>
          </Box>
        </VStack>
        <Text fontSize="lg" textAlign="justify">
          Alternatively, you can fill out the contact form below, and our team
          will get back to you as soon as possible.
        </Text>
        <Box>{/* Add your contact form component here */}</Box>
      </VStack>
    </Box>
  );
};

export default ContactUsScreen;

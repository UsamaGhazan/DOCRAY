import { Box, Heading, Text, Icon } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

function AppointmentSuccessScreen() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Icon as={MdCheckCircle} boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your appointment has been confirmed!
      </Heading>
      <Text color={'gray.500'}>
        Thank you for choosing our services. If you have any questions or need
        further assistance, please don't hesitate to contact us. Have a great
        day!
      </Text>
    </Box>
  );
}

export default AppointmentSuccessScreen;

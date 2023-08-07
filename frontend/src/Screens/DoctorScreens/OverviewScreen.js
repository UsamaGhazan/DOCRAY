import {
  Box,
  Card,
  CardBody,
  Icon,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

const OverviewScreen = () => {
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <VStack alignItems="flex-start">
        <Card
          overflow="hidden"
          variant="outline"
          bg="blackAlpha.900"
          height="150px"
          width="300px"
        >
          <CardBody>
            <Stat>
              {/* First row */}
              <StatLabel color="white">
                <Icon as={FiBarChart2} mr="2" />
                Profile Views
              </StatLabel>
              {/* Second row */}
              <StatNumber color="white">345,670</StatNumber>
              <StatHelpText color="white">
                <StatArrow
                  focusable="false"
                  aria-hidden="true"
                  type="increase"
                ></StatArrow>
                23.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default OverviewScreen;

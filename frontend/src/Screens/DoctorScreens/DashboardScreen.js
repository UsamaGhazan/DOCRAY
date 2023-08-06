import React from 'react';
import {
  useDisclosure,
  Box,
  HStack,
  Heading,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  Icon,
} from '@chakra-ui/react';
import SidebarContent from '../../Components/Doctor Components/Dashboard Components/SidebarContent';
import MobileNav from '../../Components/Doctor Components/Dashboard Components/MobileNav';
import DrawerComponent from '../../Components/Doctor Components/Dashboard Components/DrawerComponent';
import { useSelector } from 'react-redux';
import { FiBarChart, FiBarChart2 } from 'react-icons/fi';
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, doctorInfo } = useSelector(
    store => store.doctorLogin
  );

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} />
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
    </Box>
  );
};

export default Dashboard;

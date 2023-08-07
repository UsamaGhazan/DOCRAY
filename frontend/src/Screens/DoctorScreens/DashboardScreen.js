import React, { useState } from 'react';
import OverviewScreen from './OverviewScreen';
import DoctorAppointmentScreen from './DoctorAppointmentScreen';
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
  const [selectedOption, setSelectedOption] = useState('Overview');
  console.log(selectedOption);

  //setting option in sidebarcontent
  const setOption = option => {
    setSelectedOption(option);
  };

  const renderScreen = () => {
    switch (selectedOption) {
      case 'Overview':
        return <OverviewScreen />;
      case 'Appointments':
        return <DoctorAppointmentScreen />;
      default:
        return <DoctorAppointmentScreen />;
    }
  };

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
        setSelectedOption={setOption}
      />
      <DrawerComponent isOpen={isOpen} onClose={onClose} />
      <MobileNav onOpen={onOpen} />
      <Box>{renderScreen()}</Box>
    </Box>
  );
};
export default Dashboard;

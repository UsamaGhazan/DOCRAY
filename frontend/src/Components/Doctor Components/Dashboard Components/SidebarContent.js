import React, { useState } from 'react';
import DoctorAppointmentScreen from '../../../Screens/DoctorScreens/DoctorAppointmentScreen';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Icon,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import {
  FiSettings,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
} from 'react-icons/fi';
import { FaCalendarPlus } from 'react-icons/fa';

import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
  { name: 'Overview', icon: FiBarChart2, to: '/overview' },
  { name: 'Appointments', icon: FiCalendar, to: '/docAppointment' },
  { name: 'Payments', icon: FiDollarSign, to: '/payments' },
  { name: 'Set Availability', icon: FaCalendarPlus, to: '/setAvailability' },
  { name: 'Settings', icon: FiSettings, to: '/settings' },
];

const SidebarContent = () => {
  const navigate = useNavigate();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box>
          <Image
            src={require('../../../images/logo.png')}
            alt="logo"
            width="150px"
            maxW="100%"
          />
        </Box>
      </Flex>

      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => navigate(link.to)}
        >
          {link.name}
        </NavItem>
      ))}

      <Box mt="115px" width="239px">
        <Image
          src={require('../../../images/doctor.jpg')} // Change the path accordingly
          alt="Footer Image"
        />
      </Box>
    </Box>
  );
};

export default SidebarContent;

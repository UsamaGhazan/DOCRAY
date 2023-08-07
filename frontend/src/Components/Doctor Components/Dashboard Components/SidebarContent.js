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
import NavItem from './NavItem';

const LinkItems = [
  { name: 'Overview', icon: FiBarChart2 },
  { name: 'Appointments', icon: FiCalendar },
  { name: 'Payments', icon: FiDollarSign },
  { name: 'Feedback', icon: FiMessageSquare },
  { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, setSelectedOption, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box>
          <Image
            src={require('../../../images/logo.png')}
            alt="logo"
            width="150px"
            maxW="100%"
            mr={40}
          />
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => setSelectedOption(link.name)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;

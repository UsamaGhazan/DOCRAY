import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Icon,
  useColorModeValue,
  Image,
  Button,
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
import { logoutAdmin } from '../../../Features/AdminFeatures/adminLoginSlice';
import { useDispatch, useSelector } from 'react-redux';

const LinkItems = [
  { name: 'Overview', icon: FiBarChart2, to: '/adminOverview' },
  { name: 'Doctors List', icon: FiCalendar, to: '/doctors' },
  { name: 'Patients List', icon: FiDollarSign, to: '/patientList' },
  {
    name: 'Appointments',
    icon: FaCalendarPlus,
    to: '/allUpcommingAppointments',
  },
];

const AdminSidebarContent = () => {
  const dispatch = useDispatch();
  const { adminInfo } = useSelector(store => store.adminLogin);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/');
  };
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
      <Box mt="350px" width="239px" ml={'20px'}>
        <Button
          variant="outline"
          colorScheme="grey"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
export default AdminSidebarContent;

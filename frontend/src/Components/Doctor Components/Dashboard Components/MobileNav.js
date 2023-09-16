import React from 'react';
import {
  Flex,
  IconButton,
  Text,
  HStack,
  VStack,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
  Heading,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutDoc } from '../../../Features/DoctorFeature/doctorLoginSlice';
import { useColorModeValue } from '@chakra-ui/react'; // Add this line

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, doctorInfo } = useSelector(
    store => store.doctorLogin
  );

  const handleLogout = () => {
    dispatch(logoutDoc());
    navigate('/');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Heading position={'absolute'} left={250} size="md">
        Welcome back, Dr. {doctorInfo.name}
      </Heading>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box>
        <Image
          src={require('../../../images/logo.png')}
          alt="logo"
          width="150px"
          maxW="100%"
          display={{ base: 'flex', md: 'none' }}
        />
      </Box>
      <HStack spacing={{ base: '0', md: '6' }} alignItems="center">
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              focus={{ boxShadow: 'none' }}
            >
              <HStack mr={'80px'}>
                <Avatar size="sm" src={doctorInfo.image} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{doctorInfo.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Doctor
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;

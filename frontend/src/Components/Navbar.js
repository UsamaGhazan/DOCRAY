import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Features/PatientFeature/loginPatientSlice';
import { FaChevronDown } from 'react-icons/fa';
import DoctorOptions from './Doctor Components/DoctorOptions';
import { Link as RouterLink } from 'react-router-dom';

import { logoutDoc } from '../Features/DoctorFeature/doctorLoginSlice';
import { AiOutlineUser } from 'react-icons/ai';

import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  HStack,
  Link,
} from '@chakra-ui/react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Getting patient data from backend
  const patientLogin = useSelector(store => store.patientLogin);
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  //patientInfo showing user is logged in
  const { patientInfo } = patientLogin;
  const logoutHandler = () => {
    if (patientInfo) {
      dispatch(logout());
    } else if (doctorInfo) {
      dispatch(logoutDoc());
    }
  };

  const showUpcommingAppointments = () => {
    navigate('/upcommingAppointments');
  };

  return (
    <>
      <HStack align="flex-start" justify="flex-start" paddingBottom="10px">
        <Box>
          <Image
            src={require('../images/logo.png')}
            alt="logo"
            width="150px"
            maxW="100%"
          />
        </Box>

        <Box className="nav-items" fontFamily={'other'} color={'#46484b'}>
          <ul>
            <li>
              <Link as={RouterLink} to="/" fontSize="sm" p={'0 0 0 20px'}>
                Home
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/about" fontSize="sm" p={'0 0 0 20px'}>
                About
              </Link>
            </li>
            <li>
              <Link
                as={RouterLink}
                to="/contact"
                fontSize="sm"
                p={'0 0 0 20px'}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button
                  className="dropbtn"
                  style={{ color: '#46484b', padding: '0 0 0 20px' }}
                >
                  Doctors <Icon as={FaChevronDown} />
                </button>
                <div className="dropdown-content">
                  <DoctorOptions />
                </div>
              </div>
            </li>
          </ul>
          {patientInfo ? (
            <Box
              ml="800px"
              mt="16px"
              border="2px solid #000066"
              _hover={{ cursor: 'pointer' }}
            >
              <Menu>
                <MenuButton as={Box} p="2">
                  <HStack>
                    <Icon as={AiOutlineUser} />
                    <Box>{patientInfo.name}</Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={showUpcommingAppointments}>
                    My Appointments
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : doctorInfo ? (
            <Box
              ml="800px"
              mt="16px"
              border="2px solid #000066"
              _hover={{ cursor: 'pointer' }}
            >
              <Menu>
                <MenuButton as={Box} p="2">
                  {doctorInfo.name}
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <Box className="navBtns">
              <Button
                as={RouterLink}
                to="/register"
                variant="outline"
                size="md"
                color="brand.60"
                fontSize="14px"
                _hover={{ bg: 'none' }}
              >
                Login/SignUp
              </Button>
              <Button
                as={RouterLink}
                to="/docRegister"
                variant="outline"
                color="brand.50"
                fontSize="14px"
                _hover={{ bg: 'none' }}
              >
                Join as Doctor
              </Button>
            </Box>
          )}
        </Box>
      </HStack>
    </>
  );
};

export default Navbar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Features/PatientFeature/loginPatientSlice';
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
import { FaChevronDown } from 'react-icons/fa';
import DoctorOptions from './DoctorOptions';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Getting patient data from backend
  const patientLogin = useSelector(store => store.patientLogin);
  //patientInfo showing user is logged in
  const { patientInfo } = patientLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <HStack
        align="flex-start" // align items to the top
        justify="flex-start"
        paddingBottom="10px"
      >
        <Box>
          <Image
            src={require('../images/logo.png')}
            alt="logo"
            width="150px"
            maxW="100%"
          />
        </Box>

        <Box className="nav-items">
          <ul>
            <li>
              <Link as={RouterLink} to="/" fontSize="sm">
                Home
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/about" fontSize="sm">
                About
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/contact" fontSize="sm">
                Contact Us
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">
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
                  {patientInfo.name}
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

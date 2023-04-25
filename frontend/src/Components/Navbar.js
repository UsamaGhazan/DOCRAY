import React from 'react';
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
  return (
    <>
      <HStack
        align="flex-start" // align items to the top
        justify="flex-start"
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
                Home{' '}
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/about" fontSize="sm">
                About{' '}
              </Link>
            </li>
            <li>
              <Link as={RouterLink} to="/contact" fontSize="sm">
                Contact Us{' '}
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
          <Box className="navBtns">
            <Button
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
        </Box>
      </HStack>
    </>
  );
};

export default Navbar;

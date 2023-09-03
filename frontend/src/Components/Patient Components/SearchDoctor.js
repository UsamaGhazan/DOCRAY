import {
  Button,
  HStack,
  Input,
  Grid,
  GridItem,
  VStack,
  Box,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  console.log(doctors);

  const handleSearch = async () => {
    console.log('handleSearch');

    try {
      const { data } = await axios('/api/doctors/searchDoctor', {
        params: { query: searchQuery },
      });
      setDoctors(data);
    } catch (error) {}
  };

  const handleInputChange = e => {
    console.log('HandleInputChange');
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <HStack w="full">
      <VStack w="full">
        <Input
          bg="white"
          placeholder="Search for Pneumonia and TB Specialists"
          size="lg"
          value={searchQuery}
          onChange={handleInputChange}
        />{' '}
        <Box
          bg={'#FFFFFF'}
          position={'absolute'}
          zIndex={10}
          transform="translate(8px, 45px)" // Adjust the translation values
        >
          {doctors.length > 0 && searchQuery !== ''
            ? doctors.map(doctor => {
                return (
                  <Link to={`/doctors/${doctor._id}`}>
                    <Box
                      w={629}
                      h={67}
                      padding={'10px 75px 10px 10px'}
                      border={'1px solid #DEE2E6'}
                    >
                      <HStack>
                        <Avatar
                          name={doctor.name}
                          src={doctor.image}
                          size={'sm'}
                        />
                        <VStack align={'flex-start'} spacing={-1}>
                          <Box lineHeight={'24px'}>{doctor.name}</Box>
                          <Box color={'#A5A5A5'}>
                            {doctor.category} Specialist
                          </Box>
                        </VStack>
                      </HStack>
                    </Box>
                  </Link>
                );
              })
            : null}
        </Box>
      </VStack>

      <Button
        size="lg"
        className="goldbtn"
        _hover={{ bg: '#faa63a' }}
        _active={{ bg: '#faa63a' }}
        onClick={handleSearch}
      >
        Search{' '}
      </Button>
    </HStack>
  );
};

export default SearchDoctor;

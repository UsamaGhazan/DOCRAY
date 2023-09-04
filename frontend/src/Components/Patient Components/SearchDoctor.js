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
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('Search query ', searchQuery);
  const [doctors, setDoctors] = useState([]);
  const [inputFieldClicked, setInputFieldClicked] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input field

  const searchHistoryFromStorage = localStorage.getItem('searchHistory')
    ? JSON.parse(localStorage.getItem('searchHistory'))
    : [];

  useEffect(() => {
    const handleSearch = async () => {
      console.log('handleSearch');
      console.log(searchQuery);
      try {
        const { data } = await axios('/api/doctors/searchDoctor', {
          params: { query: searchQuery },
        });
        setDoctors(data);
      } catch (error) {}
    };

    // Call handleSearch whenever searchQuery changes
    if (searchQuery !== '') {
      handleSearch();
    }
  }, [searchQuery]);

  const handleInputChange = e => {
    console.log('hanldeInputchange');
    setInputFieldClicked(false);
    setSearchQuery(e.target.value); //problem here
    console.log('searchQuery in handleInput');
  };

  const saveSearchHistory = query => {
    const updatedHistory = new Set(searchHistoryFromStorage);
    updatedHistory.add(query);
    localStorage.setItem(
      'searchHistory',
      JSON.stringify(Array.from(updatedHistory))
    );
  };

  const handlePastSearch = history => {
    console.log('handlePastSearch');
    console.log('history ', history);

    setSearchQuery(history); //problem here
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputFieldClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <HStack w="full">
      <VStack w="full">
        <Input
          bg="white"
          placeholder="Search for Pneumonia and TB Specialists"
          size="lg"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={() => setInputFieldClicked(true)}
          ref={inputRef}
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
                  <Link key={doctor._id} to={`/doctors/${doctor._id}`}>
                    <Box
                      w={629}
                      h={67}
                      padding={'10px 75px 10px 10px'}
                      border={'1px solid #DEE2E6'}
                      onClick={() => saveSearchHistory(doctor.name)}
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
            : inputFieldClicked
            ? searchHistoryFromStorage.map((history, index) => {
                return (
                  <Box
                    key={index}
                    w={629}
                    h={47}
                    padding={'10px 75px 10px 10px'}
                    border={'1px solid #DEE2E6'}
                    onClick={() => handlePastSearch(history)}
                    cursor={'pointer'}
                  >
                    {history}
                  </Box>
                );
              })
            : null}
        </Box>
      </VStack>

      <Button
        size="lg"
        className="goldbtn"
        _hover={{ bg: '#d48a2c' }}
        _active={{ bg: '#faa63a' }}
        onClick={() => setSearchQuery(searchQuery)}
      >
        Search{' '}
      </Button>
    </HStack>
  );
};

export default SearchDoctor;

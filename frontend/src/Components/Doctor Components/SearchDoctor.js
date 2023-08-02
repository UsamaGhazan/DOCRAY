import { Button, HStack, Input, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

const SearchDoctor = () => {
  return (
    <HStack w="full">
      <Input
        bg="white"
        placeholder="Search for Pneumonia and TB Specialists"
        size="lg"
      />{' '}
      <Button size="lg" className="goldbtn">
        Search{' '}
      </Button>
    </HStack>
  );
};

export default SearchDoctor;

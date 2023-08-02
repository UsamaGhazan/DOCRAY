import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DoctorModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSelection = path => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Doctor Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              colorScheme="blue"
              onClick={() => handleSelection('/pneumoniaDoctors')}
              size="lg"
              width="100%"
              mb={3}
              bg="#000066"
              _hover={{ bg: '#000033' }}
              _active={{ bg: '#000033' }}
            >
              Pneumonia Doctors
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handleSelection('/tbdoctors')}
              size="lg"
              width="100%"
              bg="#000066"
              _hover={{ bg: '#000033' }}
              _active={{ bg: '#000033' }}
            >
              TB Doctors
            </Button>
          </ModalBody>
          <ModalFooter>
            <Flex justify="center" width="100%">
              <Button onClick={onClose}>Close</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoctorModal;

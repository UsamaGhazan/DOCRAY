import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const DoctorOptions = () => {
  return (
    <div>
      <TableContainer bg="white">
        <Table variant="striped" colorScheme="orange">
          <TableCaption>Pneumonia and TB Specialists</TableCaption>
          <Thead>
            <Tr>
              <Th>Pneumonia Specialists</Th>
              <Th>TB Specialists</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Dr. Jane Doe</Td>
              <Td>Dr. John Smith</Td>
            </Tr>
            <Tr>
              <Td>Dr. Susan Lee</Td>
              <Td>Dr. David Johnson</Td>
            </Tr>
            <Tr>
              <Td>Dr. Michael Chen</Td>
              <Td>Dr. Maria Rodriguez</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Link as={RouterLink} to="/pneumoniaDoctors" fontSize="sm">
                  Show More
                </Link>
              </Td>
              <Td>
                <Link as={RouterLink} to="/tbDoctors" fontSize="sm">
                  Show More
                </Link>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DoctorOptions;

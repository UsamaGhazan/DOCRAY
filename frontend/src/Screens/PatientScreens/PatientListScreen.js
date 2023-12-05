import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { getPatientList } from '../../Features/PatientFeature/patientListSlice';
import { deletePatient } from '../../Features/PatientFeature/patientDeleteSlice';
const PatientListScreen = () => {
  const dispatch = useDispatch();
  const patientList = useSelector(store => store.patientList);
  const { patients, loading, error } = patientList;
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Inside useEffect patient');
    dispatch(getPatientList());
  }, [dispatch]);

  const handleProfileClick = patientId => {
    navigate(`/patients/${patientId}`);
  };

  const handleDeleteClick = patientId => {
    dispatch(deletePatient());
  };

  return (
    <section className="patientListScreen">
      <div className="card">
        {loading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table variant="simple" ml={'90px'} mt={'50px'}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Contact Number</Th>
                <Th>Date of Birth</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients.map(patient => (
                <Tr key={patient.id} height={'80px'}>
                  <Td>{patient.name}</Td>
                  <Td>{patient.email}</Td>
                  <Td>{patient.contactNumber}</Td>
                  <Td>{new Date(patient.dateOfBirth).toLocaleDateString()}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={() => handleProfileClick(patient._id)}
                    >
                      Profile
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(patient._id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </div>
    </section>
  );
};

export default PatientListScreen;

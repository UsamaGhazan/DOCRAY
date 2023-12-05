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
import { getDoctorList } from '../../Features/DoctorFeature/doctorListSlice.js';
import { deleteDoctor } from '../../Features/DoctorFeature/doctorDeleteSlice.js';
const DoctorsListScreen = () => {
  const dispatch = useDispatch();
  const doctorList = useSelector(store => store.doctorList);
  const { doctors, loading, error } = doctorList;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDoctorList());
  }, [dispatch]);

  const handleProfileClick = doctorId => {
    navigate(`/doctors/${doctorId}`);
  };

  const handleDeleteClick = doctorId => {
    dispatch(deleteDoctor(doctorId));
  };

  return (
    <section className="doctorListScreen">
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
                <Th>Specialization</Th>
                <Th>Address</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {doctors.map(doctor => (
                <Tr key={doctor.id} height="80px">
                  <Td>{doctor.name}</Td>
                  <Td>{doctor.email}</Td>
                  <Td>{doctor.specialization}</Td>
                  <Td>{doctor.areaname}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={() => handleProfileClick(doctor._id)}
                    >
                      Profile
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(doctor._id)}
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

export default DoctorsListScreen;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DoctorCard from '../../Components/Doctor Components/DoctorCard.js';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  HStack,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  VStack,
  Heading,
  Text,
  Spinner,
  Image,
  Button,
} from '@chakra-ui/react';
import { getDoctorList } from '../../Features/DoctorFeature/doctorListSlice.js';
const TbDocScreen = () => {
  const dispatch = useDispatch();
  const doctorList = useSelector(store => store.doctorList);
  const { doctors, loading, error } = doctorList;

  useEffect(() => {
    dispatch(getDoctorList());
  }, [dispatch]);

  return (
    <section className="doctorListScreen  ">
      <div className="card">
        {loading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          doctors
            .filter(doctor => {
              return doctor.category === 'Tb';
            })
            .map(doctor => {
              return <DoctorCard doctor={doctor} />;
            })
        )}
      </div>
    </section>
  );
};

export default TbDocScreen;

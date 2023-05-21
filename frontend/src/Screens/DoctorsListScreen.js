import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardFooter, Box } from '@chakra-ui/react';
import { getDoctorList } from '../Features/DoctorFeature/doctorListSlice.js';
const DoctorsListScreen = () => {
  const dispatch = useDispatch();
  const doctorList = useSelector(store => store.doctorList);
  console.log(doctorList);

  useEffect(() => {
    dispatch(getDoctorList());
  }, [dispatch]);

  return <section className="max-width">{}</section>;
};

export default DoctorsListScreen;

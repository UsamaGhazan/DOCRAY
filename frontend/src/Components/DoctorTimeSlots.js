import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorDetails } from '../Features/DoctorFeature/doctorDetailSlice';

const DoctorTimeSlots = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const doctorId = params.id;
  const { doctor, loading, error } = useSelector(
    store => store.getDoctorDetails
  );

  return <div>DoctorTimeSlots</div>;
};

export default DoctorTimeSlots;

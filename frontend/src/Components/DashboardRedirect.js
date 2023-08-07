import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardRedirect = ({ doctorInfo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorInfo) {
      navigate('/Dashboard');
    }
  }, [doctorInfo, navigate]);

  return null;
};

export default DashboardRedirect;

import React from 'react';
import { useSelector } from 'react-redux';

const ReportGenerationScreen = () => {
  const {
    loading: detectionLoading,
    error: detectionError,
    data,
  } = useSelector(store => store.pneumoniaDetection);
  console.log(data);
  return <div>reportGenerationScreen</div>;
};

export default ReportGenerationScreen;

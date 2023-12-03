import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../Features/uploadImageSlice';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { detectTb } from '../../Features/PatientFeature/tbDetectionSlice'; // Import the tbDetectionSlice action

const TbDetectionScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading: imageLoading,
    error: imageError,
    response,
  } = useSelector(store => store.uploadImage);

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleUpload(selectedFile);
  };

  const handleUpload = async file => {
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadImage({ formData }));
  };

  const handleTestBtn = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      dispatch(detectTb(formData)); // Use the detectTb action instead of detectPneumonia

      navigate('/tbDetection/report');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response && response.image) {
      setImageUrl(response.image);
    }
  }, [response]);

  return (
    <div
      style={{ backgroundColor: '#f5f5f5', padding: '20px', height: '100vh' }}
    >
      <Box ml={'436px'}>
        <Heading fontSize={'42px'} fontWeight={600} color={'#383E35'}>
          AI-Powered Chest X-Ray Analysis
        </Heading>
        <Heading fontSize={'22px'} color={'#ff9e24'} ml={'76px'} mt={'25px'}>
          Fast and Accurate Diagnosis from Chest X-rays
        </Heading>
        <FormControl mb="20px">
          <label
            htmlFor="fileInput"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '310px',
              height: '79px',
              backgroundColor: '#000066',
              color: 'white',
              borderRadius: '5px',
              fontSize: '28px',
              cursor: 'pointer',
              marginLeft: '176px',
              marginTop: '44px',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#000044')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#000066')}
          >
            {imageLoading ? (
              <Spinner />
            ) : file ? (
              <FaCheckCircle fontSize={'40px'} />
            ) : (
              <Box>Select Image</Box>
            )}{' '}
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </FormControl>
        {file && (
          <Button
            onClick={handleTestBtn}
            fontSize={'20px'}
            bg={'#ff9e24'}
            height={'79px'}
            ml={176}
            width={310}
            transition="background-color 0.3s ease"
            _hover={{ bg: '#ff7c00' }}
            color={'#FFFFFF'}
          >
            Generate Report
          </Button>
        )}
      </Box>
    </div>
  );
};

export default TbDetectionScreen;

import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../Features/uploadImageSlice';

const PneumoniaDetectionScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

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
    console.log('form data ', formData);
    formData.append('image', file);
    dispatch(uploadImage({ formData }));
  };
  const handleTestBtn = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        'http://localhost:8000/predict',
        formData,
        config
      );

      console.log('response', response.data);
      return response.data;
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
    <>
      <Box>
        <FormControl mb="20px">
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
        <Button onClick={handleTestBtn}>Test Now</Button>
      </Box>
    </>
  );
};

export default PneumoniaDetectionScreen;

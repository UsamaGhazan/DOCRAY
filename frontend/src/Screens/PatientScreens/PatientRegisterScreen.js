import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { register } from '../../Features/PatientFeature/registerPatientSlice';
import { uploadImage } from '../../Features/uploadImageSlice';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Alert,
  Select,
} from '@chakra-ui/react';

const PatientRegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gender, setGender] = useState('Male');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const patientLogin = useSelector(store => store.patientLogin);
  const { loading, error, patientInfo } = patientLogin;
  const genderOptions = ['Male', 'Female', 'Other'];
  const [file, setFile] = useState(null);
  console.log(file);
  const [imageUrl, setImageUrl] = useState('');
  const {
    loading: imageLoading,
    error: imageError,
    response,
  } = useSelector(store => store.uploadImage);
  console.log('Response ', response);
  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    handleUpload(selectedFile);
  };

  const handleUpload = file => {
    const formData = new FormData();
    console.log('form data ', formData);
    formData.append('image', file);

    dispatch(uploadImage({ formData }));
  };

  useEffect(() => {
    console.log('useEffect running');
    if (response && response.image) {
      console.log(response.image);
      setImageUrl(response.image);
    }
  }, [response]);

  useEffect(() => {
    if (patientInfo) {
      navigate(redirect);
    }
  }, [patientInfo, navigate, redirect]);

  const handleRegister = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      dispatch(
        register({
          name,
          email,
          password,
          gender,
          contact,
          dob,
          image: imageUrl,
        })
      );
    }
  };

  return (
    <Box maxW="400px" mx="auto" p="20px" bg="#f4f4f4" borderRadius="5px">
      <Heading textAlign="center" mb="20px">
        Registration Form
      </Heading>
      {error && (
        <Alert status="error" mb="20px">
          {error}
        </Alert>
      )}
      {errorMessage && (
        <Alert status="error" mb="20px">
          {errorMessage}
        </Alert>
      )}
      <FormControl mb="20px">
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Gender</FormLabel>
        <Select value={gender} onChange={e => setGender(e.target.value)}>
          {genderOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Contact:</FormLabel>
        <Input
          type="text"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Date Of Birth</FormLabel>
        <Input type="Date" value={dob} onChange={e => setDob(e.target.value)} />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Upload Image</FormLabel>
        <Input type="file" onChange={handleFileChange} />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Password:</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Confirm Password:</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="teal"
        size="md"
        onClick={handleRegister}
        mb="20px"
        width="100%"
      >
        Register
      </Button>
      <Text textAlign="center">
        Already Signed Up?{' '}
        <Link as={RouterLink} color="teal" to="/login">
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default PatientRegisterScreen;

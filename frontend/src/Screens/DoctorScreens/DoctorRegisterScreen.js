import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { registerDoc } from '../../Features/DoctorFeature/registerDoctorSlice';
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

const DoctorRegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gender, setGender] = useState('Male');
  const [specialization, setSpecialization] = useState('');
  const [degree, setDegree] = useState('');
  const [charges, setCharges] = useState('');
  const [category, setCategory] = useState('Tuberculosis');
  const [experience, setExperience] = useState('');
  const [areaname, setAreaName] = useState('');
  const [clinicname, setClinicname] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const patientRegister = useSelector(store => store.patientRegister);
  const { loading, error, patientInfo } = patientRegister;
  const genderOptions = ['Male', 'Female', 'Other'];
  const categories = ['Tuberculosis', 'Pneumonia'];

  // useEffect(() => {
  //   if (patientInfo) {
  //     navigate(redirect);
  //   }
  // }, [patientInfo, navigate, redirect]);

  const handleRegister = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      dispatch(
        registerDoc({
          name,
          email,
          password,
          gender,
          specialization,
          degree,
          charges,
          category,
          experience,
          areaname,
          clinicname,
        })
      );
    }
  };

  return (
    <Box
      maxW="900px" /* Increase the width of the box */
      mx="auto"
      p="20px"
      bg="#f4f4f4"
      borderRadius="5px"
      display="flex" /* Use flex display to arrange fields side by side */
      flexWrap="wrap" /* Wrap fields to the next line when necessary */
      justifyContent="space-between" /* Space out the fields evenly */
    >
      <Box w="48%" mb="20px">
        {' '}
        {/* Set the width to 48% to leave space for two fields side by side */}
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        {' '}
        {/* Set the width to 48% */}
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </FormControl>
      </Box>
      {/* Add other fields similarly, using Box with width="48%" */}
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Specialization:</FormLabel>
          <Input
            maxLength="59"
            type="text"
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
            placeholder="Enter specialization"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Area Name:</FormLabel>
          <Input
            maxLength="59"
            type="text"
            value={areaname}
            onChange={e => setAreaName(e.target.value)}
            placeholder="Enter Area Name"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Clinic Name:</FormLabel>
          <Input
            maxLength="59"
            type="text"
            value={clinicname}
            onChange={e => setClinicname(e.target.value)}
            placeholder="Enter your Clinic name"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Degree:</FormLabel>
          <Input
            maxLength="59"
            type="text"
            value={degree}
            onChange={e => setDegree(e.target.value)}
            placeholder="Enter degree name(s)"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Experience:</FormLabel>
          <Input
            maxLength="59"
            type="number"
            value={experience}
            onChange={e => setExperience(e.target.value)}
            placeholder="Enter the number of years you have worked"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Fee:</FormLabel>
          <Input
            type="number"
            value={charges}
            onChange={e => setCharges(e.target.value)}
            placeholder="Enter the patient fee"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select value={gender} onChange={e => setGender(e.target.value)}>
            {genderOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Enter your specialization category:</FormLabel>
          <Select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </FormControl>
      </Box>
      <Box w="48%" mb="20px">
        <FormControl>
          <FormLabel>Confirm Password:</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </FormControl>
      </Box>
      <Button
        colorScheme="teal"
        size="md"
        onClick={handleRegister}
        mb="20px"
        width="100%"
      >
        Register
      </Button>
      <Text textAlign="center" width="100%">
        Already Signed Up?{' '}
        <Link as={RouterLink} color="teal" to="/docLogin">
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default DoctorRegisterScreen;

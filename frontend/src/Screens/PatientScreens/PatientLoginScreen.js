import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Features/PatientFeature/loginPatientSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from '@chakra-ui/react';

const PatientLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  // for redirecting the user to a specific page after a login
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const patientLogin = useSelector(store => store.patientLogin);
  const { loading, error, patientInfo } = patientLogin;
  console.log(patientInfo);

  useEffect(() => {
    if (patientInfo && redirect === '/') {
      navigate('/');
    } else if (patientInfo && redirect) {
      navigate(`/${redirect}`);
    }
  }, [patientInfo, navigate, redirect]);

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box display="flex" justifyContent="center" height="100vh" padding="2rem">
      {loading && <Spinner />}

      <Box width="300px">
        <FormControl marginBottom="1rem">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl marginBottom="1rem">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={handleLogin}
          marginBottom="1rem"
          width="100%"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default PatientLoginScreen;

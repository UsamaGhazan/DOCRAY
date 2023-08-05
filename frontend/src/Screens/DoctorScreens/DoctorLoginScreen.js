import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoc } from '../../Features/DoctorFeature/doctorLoginSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react';

const DoctorLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // for redirecting the user to a specific page after a login
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const doctorLogin = useSelector(store => store.doctorLogin);
  const { loading, error, doctorInfo } = doctorLogin;

  useEffect(() => {
    if (doctorInfo && redirect === '/') {
      navigate('/dashboard');
    } else if (doctorInfo && redirect) {
      navigate(`/${redirect}`);
    }
  }, [doctorInfo, navigate, redirect]);

  const handleLogin = e => {
    e.preventDefault();
    dispatch(loginDoc({ email, password }));
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

export default DoctorLoginScreen;

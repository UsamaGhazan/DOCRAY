import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../Features/AdminFeatures/adminLoginSlice';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react';

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // for redirecting the user to a specific page after a login
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const adminLogin = useSelector(store => store.adminLogin);
  const { loading, error, adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo && redirect === '/') {
      navigate('/adminOverview');
    } else if (adminInfo && redirect) {
      navigate(`/${redirect}`);
    }
  }, [adminInfo, navigate, redirect]);

  const handleLogin = e => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  return (
    <Box display="flex" justifyContent="center" height="100vh" padding="2rem">
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
          {loading ? <Spinner /> : <Box>Login</Box>}
        </Button>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}{' '}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AdminLoginScreen;

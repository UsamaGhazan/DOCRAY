import {
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaDollarSign, FaSmile, FaUserCheck } from 'react-icons/fa';

import { FiBarChart2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '../../Components/Doctor Components/StatCard';
const OverviewScreen = () => {
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <HStack alignItems="flex-start">
        <StatCard
          profileViews={doctorInfo.profileViews}
          info={'Profile Views '}
          icon={FiBarChart2}
        />
        <StatCard
          profileViews={doctorInfo.profileViews}
          info={'Total Earnings '}
          icon={FaDollarSign}
        />
        <StatCard
          profileViews={doctorInfo.profileViews}
          info={'Patients Checked '}
          icon={FaUserCheck}
        />
        <StatCard
          profileViews={doctorInfo.profileViews}
          info={'Satisfied Patients '}
          icon={FaSmile}
        />
      </HStack>
    </Box>
  );
};

export default OverviewScreen;

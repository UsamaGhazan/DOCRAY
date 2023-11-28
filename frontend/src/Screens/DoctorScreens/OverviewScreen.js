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
import DoctorProfileViewsGraph from '../../Components/Doctor Components/ProfileViewGraph';
const OverviewScreen = () => {
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  console.log(doctorInfo.profileViewsHistory);

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <VStack>
        <HStack spacing={20}>
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
        </HStack>

        <DoctorProfileViewsGraph
          profileViewsHistory={doctorInfo.profileViewsHistory}
        />
      </VStack>
    </Box>
  );
};

export default OverviewScreen;

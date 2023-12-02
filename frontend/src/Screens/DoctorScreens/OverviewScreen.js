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
import TotalEarningGraph from '../../Components/Doctor Components/TotalEarningGraph';
const OverviewScreen = () => {
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  const totalEarnings = doctorInfo.earningsHistory.reduce(
    (total, currentVal) => {
      return total + currentVal.earning;
    },
    0
  );
  console.log(totalEarnings);
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <VStack alignItems={'flex-start'} spacing={'60px'}>
        <HStack spacing={20} ml={'50px'}>
          <StatCard
            value={doctorInfo.profileViews}
            info={'Profile Views '}
            icon={FiBarChart2}
            change={3.44}
          />
          <StatCard
            value={totalEarnings}
            info={'Total Earnings '}
            icon={FaDollarSign}
            change={11.23}
          />
          <StatCard
            value={doctorInfo.profileViews}
            info={'Patients Checked '}
            icon={FaUserCheck}
            change={22.12}
          />
        </HStack>
        <Box>
          <HStack>
            {' '}
            <TotalEarningGraph earningsHistory={doctorInfo.earningsHistory} />
            <DoctorProfileViewsGraph
              profileViewsHistory={doctorInfo.profileViewsHistory}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default OverviewScreen;

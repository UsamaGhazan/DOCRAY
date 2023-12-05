import React, { useEffect, useRef } from 'react';
import { Box, VStack, HStack } from '@chakra-ui/react';
import { FiBarChart2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalDocAndPatients } from '../../Features/AdminFeatures/totalDocAndPatients';
import StatCard from '../../Components/Doctor Components/StatCard';
import Chart from 'chart.js/auto';

const AdminOverviewScreen = () => {
  const dispatch = useDispatch();
  const { noOfDocandPat } = useSelector(store => store.totalDocAndPat);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    dispatch(getTotalDocAndPatients());
  }, [dispatch]);

  useEffect(() => {
    // Dummy data (replace this with actual data from your server)
    const doctorsJoinedData = [5, 8, 10, 6, 12, 9, 7];
    const patientsJoinedData = [15, 20, 18, 25, 22, 30, 28];

    // Bar chart
    const barData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Doctors Joined',
          data: doctorsJoinedData,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    // Line chart
    const lineData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Patients Joined',
          fill: false,
          tension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: patientsJoinedData,
        },
      ],
    };

    const barChart = new Chart(barChartRef.current, {
      type: 'bar',
      data: barData,
    });

    const lineChart = new Chart(lineChartRef.current, {
      type: 'line',
      data: lineData,
    });

    return () => {
      // Cleanup charts on component unmount
      barChart.destroy();
      lineChart.destroy();
    };
  }, []);

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <VStack alignItems="flex-start" spacing="60px" mt="50px">
        <HStack spacing={20} ml="50px">
          {noOfDocandPat && noOfDocandPat.totalDoctors !== undefined && (
            <StatCard
              info="Doctors joined in"
              // value={noOfDocandPat.totalDoctors}
              value={57}
              icon={FiBarChart2}
              change={3.44}
            />
          )}
          {noOfDocandPat && noOfDocandPat.totalPatients !== undefined && (
            <StatCard
              info="Patients joined in"
              // value={noOfDocandPat.totalPatients}
              value={168}
              icon={FiBarChart2}
              change={23.7}
            />
          )}
          {noOfDocandPat && noOfDocandPat.totalPatients !== undefined && (
            <StatCard
              info="Total Appointments in"
              value={noOfDocandPat.totalAppointments}
              icon={FiBarChart2}
              change={1.1}
            />
          )}
        </HStack>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <canvas ref={barChartRef} width="600" height="300"></canvas>
          </Box>
          <Box>
            <canvas ref={lineChartRef} width="600" height="300"></canvas>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default AdminOverviewScreen;

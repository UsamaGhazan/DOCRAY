import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Box, HStack } from '@chakra-ui/react';
const DoctorProfileViewsGraph = ({ profileViewsHistory }) => {
  useEffect(() => {
    // Extract dates and views from profileViewsHistory
    const dates = profileViewsHistory.map(entry =>
      new Date(entry.date).toLocaleDateString()
    );
    const views = profileViewsHistory.map(entry => entry.views);

    // Prepare data for the last 7 days
    const last7DaysDates = dates.slice(-7);
    const last7DaysViews = views.slice(-7);

    // Chart.js configuration
    const ctx = document.getElementById('profileViewsChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: last7DaysDates,
        datasets: [
          {
            label: 'Profile Views',
            data: last7DaysViews,

            backgroundColor: 'rgba(34, 139, 34, 0.2)',
            borderColor: '#228B22',

            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: last7DaysDates,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [profileViewsHistory]);

  return (
    <HStack>
      <Box width={'630px'}>
        <canvas id="profileViewsChart" width="200" height="100"></canvas>
      </Box>
    </HStack>
  );
};

export default DoctorProfileViewsGraph;

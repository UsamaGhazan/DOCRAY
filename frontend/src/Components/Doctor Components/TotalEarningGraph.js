// EarningsGraph.js
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@chakra-ui/react';

const TotalEarningGraph = ({ earningsHistory }) => {
  useEffect(() => {
    const prepareChartData = data => {
      const dates = data.map(entry =>
        new Date(entry.date).toLocaleDateString()
      );
      const values = data.map(entry => entry.earning);
      return { dates, values };
    };

    const earningsData = prepareChartData(earningsHistory);
    const last7DaysEarningsDates = earningsData.dates.slice(-7);
    const last7DaysEarningsValues = earningsData.values.slice(-7);

    const earningsCtx = document
      .getElementById('earningsChart')
      .getContext('2d');
    new Chart(earningsCtx, {
      type: 'bar',
      data: {
        labels: last7DaysEarningsDates,
        datasets: [
          {
            label: 'Earnings',
            data: last7DaysEarningsValues,
            backgroundColor: 'rgba(255, 223, 0, 0.2)',
            borderColor: '#FFDF00',

            borderWidth: 4,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: last7DaysEarningsDates,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [earningsHistory]);

  return (
    <Box width={'630px'}>
      <canvas id="earningsChart" width="200" height="100"></canvas>
    </Box>
  );
};

export default TotalEarningGraph;

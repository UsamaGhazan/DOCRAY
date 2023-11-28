import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

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
      type: 'line', // or 'bar' for a bar chart
      data: {
        labels: last7DaysDates,
        datasets: [
          {
            label: 'Profile Views',
            data: last7DaysViews,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
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

  return <canvas id="profileViewsChart" width="400" height="200"></canvas>;
};

export default DoctorProfileViewsGraph;

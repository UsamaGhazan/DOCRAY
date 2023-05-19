const express = require('express');
const doctors = require('./data/doctors');
const app = express();

app.get('/', (req, res) => {
  res.send('Api is running...');
});

app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

app.listen(5000, console.log('Server is running on port 5000'));

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const trafficLights = [
  { id: 1, color: "red", duration: 3000 },
  { id: 2, color: "green", duration: 5000 },
  { id: 3, color: "yellow", duration: 2000 }
];

let currentTrafficLightIndex = 0;

app.use(cors());

app.use(express.static(path.join('trafficsimulator/', 'build')));

app.get('/api/nextTrafficLight', (req, res) => {
  const nextTrafficLight = trafficLights[currentTrafficLightIndex];
  currentTrafficLightIndex = (currentTrafficLightIndex + 1) % trafficLights.length;
  res.json(nextTrafficLight);
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
  console.log(`Server is running on 3001`);
});

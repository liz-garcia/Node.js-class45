import express from 'express';
import fetch from 'node-fetch';
import { keys } from './sources/keys.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === '404') {
      res.json({ weatherText: 'City is not found!' });
    } else {
      const cityName = data.name;
      const temperature = data.main.temp;
      res.json({ weatherText: `The temperature in ${cityName} is ${temperature}°C.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching weather data.');
  }
});

app.get('/weather', (req, res) => {
  res.send('This is the weather route.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

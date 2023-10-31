import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`You entered the city: ${cityName}`);
});

app.get('/weather', (req, res) => {
  res.send('This is the weather route.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

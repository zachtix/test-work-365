const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const { API_PORT, ORIGINS } = process.env;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors());
app.use(express.json());

app.get('/api/covid19', cors(corsOptions), async (req, res) => {
  try {
    const response = await axios.get('https://covid19.traffy.in.th/api/state-covid19');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(API_PORT, () => {
  console.log('CORS enable. Server on port '+API_PORT);
})
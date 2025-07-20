const express = require('express');
const bodyParser = require('body-parser');
const { sendTapEvent } = require('./producer');
require('./consumer'); // start consumer
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/tap', async (req, res) => {
  const { userId } = req.body;
  await sendTapEvent(userId);
  res.send({ status: 'Tap registered' });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

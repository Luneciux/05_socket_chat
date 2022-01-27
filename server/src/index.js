const { urlencoded } = require('body-parser');
const express = require('express');

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('ok');
});

require('./app/controllers/index')(app);

app.listen(3000);
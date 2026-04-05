const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();
const mongoose = require('mongoose');

require('./app/models/inventory.model.js');

// Remove old options like useNewUrlParser and useUnifiedTopology
mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongoose connection open');
  })
  .catch((err) => {
    console.log('Connection error:', err.message);
  });

require('./app/routes/inventory.router.js')(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
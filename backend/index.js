const express = require('express');
const {connectDataBase} = require('./db/mongoDb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/uploads' , express.static('uploads'))
app.use(express.json());

let indexRoute = require('./routes/index.router');

app.use( '/' , indexRoute); 

connectDataBase().then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error("Failed to connect database", error);
});

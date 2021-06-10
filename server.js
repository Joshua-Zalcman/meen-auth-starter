//dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

//DB configuration
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//DB error/success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
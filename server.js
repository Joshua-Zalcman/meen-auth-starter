//dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const session = require('express-session');
const methodOverride = require('method-override');

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));

//routes
const userController = require('./controllers/users');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

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



// routes - index (home)
app.get('/', (req, res) => {
  if (req.session.currentUser) {
    res.render('dashboard.ejs', {
      currentUser: req.session.currentUser
    });
  } else {
    res.render('index.ejs', {
      currentUser: req.session.currentUser
    });
  }
});

//listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}`);
});
const bcrypt = require('bcrypt');
const express = require('express');
const sessionsRouter = express.Router();
const User = require('../models/user');

//new (login)
sessionsRouter.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  });
});
//delete (logout)
sessionsRouter.delete('/', (req, res) => {
  req.session.destroy((error) => {
    //console.log('delete');
    res.redirect('/');
  });
});
//create (login route)
sessionsRouter.post('/', (req, res) => {
  //find user by email
  User.findOne({
    email: req.body.email
  }, (error, foundUser) => {
    //respong if email not in database
    if (!foundUser) {
      res.send('No user with that email adress has been registered');
    } else {//check password if email is in database
      //compare password entered to encryptes password in database
      const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
      if (passwordMatches) {
        //set session to user
        req.session.currentUser = foundUser;
        //console.log(req.session.currentUser);
        res.redirect('/');
      } else {
        //report wrong password
        res.send('invalid password');
      }
    }
  });
});


module.exports = sessionsRouter;
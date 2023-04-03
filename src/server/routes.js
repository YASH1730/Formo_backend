const route = require('express').Router();
const JWT = require('jsonwebtoken')
// controller 
const user = require('./controller/user')
const form = require('./controller/form')

// middleware For Authentication

function AuthJwt(req, res, next) {
    if (req.headers.authorization === undefined) return res.sendStatus(401);
  
    let token = req.headers.authorization.split("Bearer ")[1];
  
    JWT.verify(token, process.env.JWT_SECRETE, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  

//register
route.post('/register',user.register);
//login
route.post('/login',user.login);
//addForm
route.post('/addForm',form.addForm);
//listForm
route.get('/listForm',AuthJwt,form.listForm);
//getFormDetails
route.get('/getFormDetails',form.getFormDetails);
//editForm
route.patch('/editForm',AuthJwt,form.editForm);
//submitResponse
route.post('/submitResponse',form.submitResponse);



module.exports = route
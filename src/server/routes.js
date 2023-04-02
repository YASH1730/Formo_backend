const route = require('express').Router();

// controller 
const user = require('./controller/user')
const form = require('./controller/form')

route.get('/',(req,res)=>{
    console.log('I am on')
    res.send(' I am okay')
})

//register
route.post('/register',user.register);
//login
route.post('/login',user.login);
//addForm
route.post('/addForm',form.addForm);
//listForm
route.get('/listForm',form.listForm);
//getFormDetails
route.get('/getFormDetails',form.getFormDetails);
//editForm
route.patch('/editForm',form.editForm);
//submitResponse
route.post('/submitResponse',form.submitResponse);



module.exports = route
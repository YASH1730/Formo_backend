const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongo = require('./src/database/dbConfig')
const multer = require('multer')()
const core = require('cors')

app.use(core());
app.use(multer.none());
app.use(express.urlencoded({extended : false}));

// routes
app.use('/api',require('./src/server/routes'))


app.listen(PORT,()=>{
    console.log('Server running on Port 8000')
})
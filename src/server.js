const express = require('express')
const app = express()
const db= require('./db')
const port = 3000
const { jwtAuthMiddleware, generateJwt } = require('./utils/jwt')


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Prescription API!')
})

//routes
const registerRoute=require('./routes/register.js');
app.use('/auth',registerRoute);






app.listen(port, () => {
  console.log(`Prescription api listening on port ${port}`)
})

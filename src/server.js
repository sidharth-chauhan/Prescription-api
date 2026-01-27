const express = require('express')
const app = express()
const db= require('./db')
const port = 3000
const cors = require('cors')
const { jwtAuthMiddleware, generateJwt } = require('./utils/jwt')

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Prescription API!')
})

//routes
const registerRoute=require('./routes/register.js');
app.use('/auth',registerRoute);

app.get('/protected', jwtAuthMiddleware, (req, res) => {
  const user = req.user;
  res.json({ message: 'This is a protected route', user });
})

const prescriptionRoutes = require('./routes/prescription');
app.use('/prescription', jwtAuthMiddleware, prescriptionRoutes);






app.listen(port, () => {
  console.log(`Prescription api listening on port ${port}`)
})

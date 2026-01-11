const express = require('express')
const app = express()
const port = 3000

app.get('/prescriptions',(req,res)=>{
  res.send('welcome to the prescriptions API')
})

app.listen(port, () => {
  console.log(`Prescription api listening on port ${port}`)
})

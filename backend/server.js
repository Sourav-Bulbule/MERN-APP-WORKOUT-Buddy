require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//expresss app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})

//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes)


//connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  //listen for request
  app.listen(process.env.PORT, ()=>{
  console.log('Connected to DB & lsitening on port', process.env.PORT)
})
})
.catch((error)=>{
  console.log(error);
})

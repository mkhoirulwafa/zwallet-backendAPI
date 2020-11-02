const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const multer = require('multer')
const cors = require('cors')
require('dotenv').config()

//middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
// var whitelist = ['http://localhost:3000']
app.use(cors())
// app.use(multer)

//env
const port = process.env.PORT || 8000
const URI = process.env.URI

//routes
const userRoute = require('./src/routes/userRoutes')
const authRoute = require('./src/routes/authRoutes')
const topupRoutes = require('./src/routes/topupRoutes')
const transferRoutes = require('./src/routes/transferRoutes')
const {authorization} = require('./src/middlewares/authorization')

app.use(`${URI}/auth`, authRoute)
app.use(`${URI}/users`, authorization, userRoute)
app.use(`${URI}/topup`, topupRoutes)
app.use(`${URI}/transfer`, transferRoutes)



app.listen(port, ()=>{
    console.log(`Server running at Port ${port}`)
})
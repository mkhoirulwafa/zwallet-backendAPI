const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const multer = require('multer')
const cors = require("cors");
require("dotenv").config();

//firebase
var admin = require("firebase-admin");

var serviceAccount = require("./src/helpers/zwallet-9c9ae-firebase-adminsdk-72e1m-36f6636ade.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zwallet-9c9ae.firebaseio.com",
});

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var whitelist = ['http://localhost:3000']
app.use(cors());
// app.use(multer)

//env
const port = process.env.PORT || 8000;
const URI = process.env.URI;

//routes
const userRoute = require("./src/routes/userRoutes");
const authRoute = require("./src/routes/authRoutes");
const topupRoutes = require("./src/routes/topupRoutes");
const transferRoutes = require("./src/routes/transferRoutes");
// const {authorization} = require('./src/middlewares/authorization')

app.use(`${URI}/auth`, authRoute);
app.use(`${URI}/users`, userRoute);
app.use(`${URI}/topup`, topupRoutes);
app.use(`${URI}/transfer`, transferRoutes);

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});

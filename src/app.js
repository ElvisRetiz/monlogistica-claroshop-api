const express = require("express");

const app = express();

//CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
const userRoute = require('./routes/user.route');

app.use('api/usuarios',userRoute);

module.exports = app;
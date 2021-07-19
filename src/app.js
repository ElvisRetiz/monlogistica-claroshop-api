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
const branchRoute = require('./routes/branch.route');
const customerRoute = require('./routes/customer.route');
const driverRoute = require('./routes/driver.route');
const warehouseRoute = require('./routes/warehouse.route');
const areaRoute = require('./routes/area.route');
const areaCPRoute = require('./routes/areaCP.route');
const adressRoute = require('./routes/adress.route');
const orderRoute = require('./routes/order.route');
const guideRoute = require('./routes/guide.route');
const authRoute = require('./routes/auth.controller');

app.use('/api/usuarios',userRoute);
app.use('/api/sucursales',branchRoute);
app.use('/api/clientes',customerRoute);
app.use('/api/choferes',driverRoute);
app.use('/api/almacenes',warehouseRoute);
app.use('/api/areas',areaRoute);
app.use('/api/areasCP',areaCPRoute);
app.use('/api/direcciones',adressRoute);
app.use('/api/ordenes',orderRoute);
app.use('/api/guias',guideRoute);
app.use('/api/acceso',authRoute);

module.exports = app;
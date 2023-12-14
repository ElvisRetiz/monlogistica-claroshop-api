const express = require("express");
const path = require('path');
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
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

//Routes
const userRoute = require('./routes/user.route');
const branchRoute = require('./routes/branch.route');
const customerRoute = require('./routes/customer.route');
const driverRoute = require('./routes/driver.route');
const warehouseRoute = require('./routes/warehouse.route');
const areaRoute = require('./routes/area.route');
const zoneRoute = require('./routes/zone.route');
const areaCPRoute = require('./routes/areaCP.route');
const adressRoute = require('./routes/adress.route');
const orderRoute = require('./routes/order.route');
const guideRoute = require('./routes/guide.route');
const authRoute = require('./routes/auth.route');
const reportRoute = require('./routes/report.route');
const webpushRoute = require('./routes/webpush.route');
const parametersRoute = require('./routes/parameters.route');
const tokenRoute = require('./routes/token.route');

app.use('/api/usuarios',userRoute);
app.use('/api/sucursales',branchRoute);
app.use('/api/clientes',customerRoute);
app.use('/api/choferes',driverRoute);
app.use('/api/almacenes',warehouseRoute);
app.use('/api/areas',areaRoute);
app.use('/api/zonas',zoneRoute);
app.use('/api/areasCP',areaCPRoute);
app.use('/api/direcciones',adressRoute);
app.use('/api/ordenes',orderRoute);
app.use('/api/guias',guideRoute);
app.use('/api/acceso',authRoute);
app.use('/api/reportes',reportRoute);
app.use('/api/notifications',webpushRoute);
app.use('/api/parameters',parametersRoute);
app.use('/api',tokenRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

module.exports = app;
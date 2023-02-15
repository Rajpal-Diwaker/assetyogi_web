const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const config = require("./Utilities/config").config;
const dbConfig = require("./Utilities/dbConfig");
const fs = require('fs');

//Routes
const adminRoute = require('./Routes/adminRoutes');
const userEncrypt = require('./Routes/userEncrypt');


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

app.use('/api/admin', adminRoute);
app.use('/api/user', userEncrypt);

const PORT = config.NODE_SERVER_PORT.port;


app.use("/adminPanel", express.static(path.join(__dirname, "admin_dist")));

app.use("/findemy", express.static(path.join(__dirname, "website_dist")));

app.use(express.static(__dirname + 'website_dist'));
app.get('/**', (req, res) => res.sendFile(path.resolve('website_dist/index.html')))

// app.use("/adminPanel", express.static(path.join(__dirname, "admin_dist")));
// app.use("/*", express.static(path.join(__dirname, "website_dist")));

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
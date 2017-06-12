const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var methodOverride = require('method-override');
const app = express();
const indexRoutes = require('./routes/index');

// Database Config (mongoose will try to connect to MLAB instance, and creates a new database locally named 'harvard-vr' if it cannot)
const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
mongoose.connect(url);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use(indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
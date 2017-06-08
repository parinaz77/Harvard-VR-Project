const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var multer = require('multer');
var gcloud = require('google-cloud');
var gcs = gcloud.storage({
  projectId: 'grape-spaceship-123',
  keyFilename: '/path/to/keyfile.json'
});

const app = express();
const indexRoutes = require('./routes/index');

const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";

// mongodb://<dbuser>:<dbpassword>@ds113841.mlab.com:13841/harvard-vr

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";
// mongodb://<dbuser>:<dbpassword>@ds113282.mlab.com:13282/heroku_03ks57hf

mongoose.connect('mongodb://parinaz77:password@ds113282.mlab.com:13282/heroku_03ks57hf');

var conn = mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(indexRoutes);





app.get('/collections', function(req, res) {
	res.render('collections');
});

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
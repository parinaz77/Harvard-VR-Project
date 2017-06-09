const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var request = require('request');
var fileUpload = require('express-fileupload');

var gcloud = require('google-cloud');
var gcs = gcloud.storage({
  projectId: 'harvard-vr-169919'
  // keyFilename: '/path/to/keyfile.json'
});
var bucket = gcs.bucket('harvard-vr')

const app = express();
const indexRoutes = require('./routes/index');

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// const url = "mongodb://parinaz77:password@ds113282.mlab.com:13282/heroku_03ks57hf" || "mongodb://localhost:27017/harvard-vr";

// mongodb://<dbuser>:<dbpassword>@ds113841.mlab.com:13841/harvard-vr

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";
// mongodb://<dbuser>:<dbpassword>@ds113282.mlab.com:13282/heroku_03ks57hf

mongoose.connect("mongodb://localhost:27017/harvard-vr");



const collectionSchema = new mongoose.Schema({
	title: String,
	bucketName: String,
	description: String,
	images: []
});

const Collection = mongoose.model('Collection', collectionSchema);

// Collection.create({title: 'harvard-vr', images: ['test.png', 'test_2.png']});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(fileUpload());

app.use(indexRoutes);

var collection = gcs.bucket('harvard-vr');

// Example request: 'https://www.googleapis.com/storage/v1/b/harvard-vr/o/test.png'
app.get('/collections', function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			console.log('collections route', collections);
			res.render('collections', {collection: collections[0]})
		}
	});
});

// Test route to GCS API for downloading a single image in bucket and storing the image in a local folder
app.get('/test', function(req, res) {
	collection.file('test.png').download({
		destination: 'photos/test.png'
	}, function(err) {
		console.log(err);
	});
});

app.post('/upload', function(req, res) {
	// console.log(req.files)
	// console.log('public/photos/' + req.files.image.name);
	let image = req.files.image;
	image.mv('public/photos/' + req.files.image.name);
	collection.upload('public/photos/' + req.files.image.name), function(err, file) {
		if(!err) {
			console.log('Upload successful');
		}
	}
	console.log(req.body.title);

	// Create a new Collection with information from form in 'collections.ejs'
	Collection.create({title: req.body.title, description: req.body.description, images: [req.files.image.name]}, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			console.log('Collection created successfully!');
			res.redirect('/collections');
		}
	});
});



const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
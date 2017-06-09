const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var request = require('request');
var fileUpload = require('express-fileupload');
var methodOverride = require('method-override');

var gcloud = require('google-cloud');
var gcs = gcloud.storage({
  projectId: 'harvard-vr-169919'
  // keyFilename: '/path/to/keyfile.json'
});


// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Instantiates a client
const storage = Storage({
  projectId: 'harvard-vr-169919'
});

// The name for the new bucket
const bucket = 'harvard-vr';

// Creates the new bucket
storage.createBucket(bucket)
  .then(() => {
    console.log(`Bucket ${bucket} created.`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

const app = express();
const indexRoutes = require('./routes/index');

const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// const url = "mongodb://parinaz77:password@ds113282.mlab.com:13282/heroku_03ks57hf" || "mongodb://localhost:27017/harvard-vr";

// mongodb://<dbuser>:<dbpassword>@ds113841.mlab.com:13841/harvard-vr

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";
// mongodb://<dbuser>:<dbpassword>@ds113282.mlab.com:13282/heroku_03ks57hf

mongoose.connect(url);



const collectionSchema = new mongoose.Schema({
	title: String,
	bucketName: String,
	description: String,
	images: []
});

const Collection = mongoose.model('Collection', collectionSchema);

// Collection.create({title: 'vr-research', images: ['test_3.png','test_4.png']});
// 
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(methodOverride('_method'));

app.use(indexRoutes);

var collection = gcs.bucket('harvard-vr');

// Example request: 'https://www.googleapis.com/storage/v1/b/harvard-vr/o/test.png'
app.get('/collections', function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			console.log('collections route', collections);
			// res.render('collections', {collection: collections[0]})
			console.log(collections[0])
			console.log(collections[1])
			res.render('collections', {collections: collections})
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

app.get('/collections/:id/edit', function(req, res) {
	console.log(req.params.id);
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('edit', { collection: collection })
		}
	})
});

app.put('/collections/:id', function(req, res) {
	// let collection = Collection.findByIdAndUpdate(req.params.id, function())
	let image = req.files.image;
	image.mv('public/photos/' + req.files.image.name);
	collection.upload('public/photos/' + req.files.image.name), function(err, file) {
		if(!err) {
			console.log('Upload successful');
		}
	}
	res.redirect('/collections');
	console.log('Hit PUT route,', req.files)
})


const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
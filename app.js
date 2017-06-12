const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var request = require('request');
var fileUpload = require('express-fileupload');
var methodOverride = require('method-override');
var gcloud = require('google-cloud');

const app = express();
const indexRoutes = require('./routes/index');

// Service Account credentials for server-server interactions
var gcs = gcloud.storage({
  projectId: 'harvard-vr-169919',
  keyFilename: './harvard-vr-93a42650c36e.json'
});

const clientID = '144708981782-5hht2hv7cve7omnkd09ia3s9jc79btdd.apps.googleusercontent.com';
const clientSecret = 'rDo72rlRiXovvVl1JBeH0C-g';

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


// connects to MLAB instance or creates a new database locally if can't connect
const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
mongoose.connect(url);



const collectionSchema = new mongoose.Schema({
	title: String,
	bucketName: String,
	description: String,
	images: []
});

const Collection = mongoose.model('Collection', collectionSchema);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use(indexRoutes);

var collection = gcs.bucket('harvard-vr');

// ================================================================================
// ROUTES
// ================================================================================

app.get('/collections', function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			console.log('collections route', collections);
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
	// Downloads image from form element locally
	let image = req.files.image;
	image.mv('public/photos/' + req.files.image.name);

	// Uploads image stored locally to cloud storage
	collection.upload('public/photos/' + req.files.image.name), function(err, file) {
		console.log('Attempting to upload image');
	for (var i=0; i < image.length; i++){
		image[i].mv('public/photos/' + req.files.image[i].name);
		collection.upload('public/photos/' + req.files.image[i].name), function(err, file) {
			if(!err) {
				console.log('Upload successful');
			}
		}
	}

	// Create a new Collection to save reference of images in cloud
	Collection.create({title: req.body.title, description: req.body.description, images: req.files.image}, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			console.log('Collection created successfully!');
			res.redirect('/collections');
		}
	});
});

app.get('/collections/:id/edit', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('edit', { collection: collection })
		}
	})
});

app.get('/collections/:id/delete', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			collection.remove( function ( err, todo ){
			res.redirect('/collections');
    });
		}
	})
});

app.get('/collections/:id/view', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('collection-view', {collection: collection})
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
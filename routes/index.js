var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var gcloud = require('google-cloud');
var request = require('request');
var gcs = gcloud.storage({
  projectId: 'harvard-vr-169919',
  keyFilename: 'harvard-vr-93a42650c36e.json'
});
var bucket = gcs.bucket('harvard-vr');
var collection = gcs.bucket('harvard-vr');
var Collection = require('../models/collection');


router.get('/collections', function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			// console.log('collections route', collections);
			res.render('collections', {collections: collections})
		}
	});
});

router.post('/upload', function(req, res) {
	let image = req.files.image;
	console.log(image.length);

	if (image.length) {
		for (var i=0; i < image.length; i++){
			image[i].mv('public/photos/' + req.files.image[i].name);
			collection.upload('public/photos/' + req.files.image[i].name), function(err, file) {
				if(!err) {
					console.log('Upload successful');
				}
			}
		}
	} else {
		image.mv('public/photos/' + req.files.image.name);
			collection.upload('public/photos/' + req.files.image.name), function(err, file) {
				if(!err) {
					console.log('Upload successful');
				}
			}
		}
	
	// Create a new Collection with information from form in 'collections.ejs'
	Collection.create({title: req.body.title, description: req.body.description, images: req.files.image}, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			console.log('Collection created successfully!');
			res.redirect('/collections');
		}
	});
});

router.get('/collections/:id/edit', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('edit', { collection: collection })
		}
	})
});

router.get('/collections/:id/delete', function(req, res) {
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

router.get('/collections/:id/view', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('collection-view', {collection: collection})
		}
	})
});

router.put('/collections/:id', function(req, res) {
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

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/collections/:id/vr', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('vr', {collection: collection})
			console.log(collection);
		}
	})
});

router.get('/collections/:id/vr_slideshow', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('vr_slideshow', {collection: collection})
			console.log(collection);
		}
	})
});

router.get('/collections/:id/vr2', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('vr2', {collection: collection})
		}
	})
});

router.get('/test', function(req,res) {

	res.render('test');
});

module.exports = router;

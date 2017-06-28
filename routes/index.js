var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var gcloud = require('google-cloud');
var storage = require('@google-cloud/storage');
var request = require('request');
var gcs = storage({
  projectId: 'harvard-vr-169919',
  keyFilename: 'harvard-vr-3890e120368b.json'
});
var bucket = gcs.bucket('harvard-vr');
var collection = gcs.bucket('harvard-vr');
var Collection = require('../models/collection');
var Video = require('../models/video');


router.get('/collections', function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			// console.log(collections);
			res.render('collections', {collections: collections})
		}
	});
});

router.post('/upload', function(req, res) {
	let image = req.files.image;
	console.log(image.length, req.files);

	if (image.length) {
		for (var i=0; i < image.length; i++){
			image[i].mv('uploads/' + req.files.image[i].name);
			collection.upload('uploads/' + req.files.image[i].name), function(err, file) {
				if(!err) {
					console.log('Upload successful');
				}
			}
		}
	} else {
		image.mv('uploads/' + req.files.image.name);
			collection.upload('uploads/' + req.files.image.name), function(err, file) {
				console.log(file);
				if(file) {
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


router.get('/videos/:id/delete', function(req, res) {
	Video.findById(req.params.id, function(err, video) {
		if(err) {
			console.log(err);
		} else {
			video.remove( function ( err, todo ){
			res.redirect('/videos');
    });
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

router.get('/collections/:id/curve-vr', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('curve-vr', {collection: collection})
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

router.get('/collections/:id/regular-vr', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('regular-vr', {collection: collection})
		}
	})
});

router.get('/collections/:id/cube-vr', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('cube-vr', {collection: collection})
		}
	})
});

router.get('/slideshow_test/:id', function(req, res) {
	res.render('slideshow_test');
});

router.get('/collections/:id/flicker', function(req,res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('flicker', {collection: collection})
		}
	})
});

router.get('/vr_video', function(req, res) {
	res.render('vr_video');
});

router.post('/upload_video', function(req, res) {
	let image = req.files.image;
	console.log(image.length, req.files);

	if (image.length) {
		for (var i=0; i < image.length; i++){
			image[i].mv('uploads/' + req.files.image[i].name);
			collection.upload('uploads/' + req.files.image[i].name), function(err, file) {
				if(!err) {
					console.log('Upload successful');
				}
			}
		}
	} else {
		image.mv('uploads/' + req.files.image.name);
			collection.upload('uploads/' + req.files.image.name), function(err, file) {
				console.log(file);
				if(file) {
					console.log('Upload successful');
				}
			}
		}
	
	// Create a new Collection with information from form in 'collections.ejs'
	Video.create({title: req.body.title, description: req.body.description, video: req.files.image.name}, function(err, video) {
		if(err) {
			console.log(err);
		} else {
			console.log('Video created successfully!');
			res.redirect('/videos');
		}
	});
});

router.get('/videos', function(req, res) {
	Video.find({}, function(err, videos) {
		if(err) {
			console.log(err);
		} else {
			console.log(videos);
			res.render('videos', {videos: videos})
		}
	});
});

router.get('/videos/:id/vr_video', function(req, res) {
	Video.findById(req.params.id, function(err, video) {
		if(err) {
			console.log(err);
		} else {
			res.render('vr_video', {video: video})
		}
	})
});

router.get('/videos/:id/360video', function(req, res) {
	Video.findById(req.params.id, function(err, video) {
		if(err) {
			console.log(err);
		} else {
			res.render('360video', {video: video})
		}
	})
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Collection = require('../models/collection');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/collections/:id/vr', function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if(err) {
			console.log(err);
		} else {
			res.render('vr', {collection: collection})
		}
	})
});

// router.get('/collections', function(req, res) {
// 	res.render('collections');
// });

module.exports = router;

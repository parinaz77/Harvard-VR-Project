var express = require('express');
var router = express.Router();
var Collection = require('../models/collection');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/vr', function(req, res) {
	res.render('vr');
});

// router.get('/collections', function(req, res) {
// 	res.render('collections');
// });

module.exports = router;

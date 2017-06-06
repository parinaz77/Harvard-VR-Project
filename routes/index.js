var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/vr', function(req, res) {
	res.render('vr');
});

module.exports = router;

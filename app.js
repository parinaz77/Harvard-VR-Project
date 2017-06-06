const express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var multer = require('multer');


const app = express();
const indexRoutes = require('./routes/index');

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";

mongoose.connect(url);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(indexRoutes);

var photoSchema = mongoose.Schema({
	img: {data: Buffer, contentType: String}
});

var Photo = mongoose.model('Photo', photoSchema);

app.post('/api/photo', function(req, res) {
	var newPhoto = new Photo();
	newPhoto.img.data = fs.readFileSync(req.files.userPhoto.path);
	newPhoto.img.contentType = 'image/png';
	newPhoto.save();
});

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
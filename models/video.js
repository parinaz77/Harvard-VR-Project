const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
	title: String,
	bucketName: String,
	description: String,
	// images array contains reference to the names of the image files in collection
	video: []
});

// Creates a mongoose model for under the const 'Collection' which will contain methods to interact with MongoDB
// e.g. (create() & findById())
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
const format = require('util').format;
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
var multer = require('multer');

var upload = multer({dest: "./uploads"});


const app = express();
const indexRoutes = require('./routes/index');

const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";

// mongodb://<dbuser>:<dbpassword>@ds113841.mlab.com:13841/harvard-vr

// const url = "mongodb://tonyn4444:password@ds113841.mlab.com:13841/harvard-vr" || "mongodb://localhost:27017/harvard-vr";
// var url = process.env.DATABASEURL || "mongodb://localhost:27017/harvard-vr";
// mongodb://<dbuser>:<dbpassword>@ds113282.mlab.com:13282/heroku_03ks57hf

mongoose.connect('mongodb://parinaz77:password@ds113282.mlab.com:13282/heroku_03ks57hf');

var conn = mongoose.connection;

var gfs;

var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(indexRoutes);

conn.once("open", function(){
  gfs = Grid(conn.db);
  app.get("/", function(req,res){
    //renders a multipart/form-data form
    res.render("home");
  });

  //second parameter is multer middleware.
  app.post("/", upload.single("avatar"), function(req, res, next){
    //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
    var writestream = gfs.createWriteStream({
      filename: req.file.originalname
    });
    //
    // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
    fs.createReadStream("./uploads/" + req.file.filename)
      .on("end", function(){fs.unlink("./uploads/"+ req.file.filename, function(err){res.send("success")})})
        .on("err", function(){res.send("Error uploading image")})
          .pipe(writestream);
  });

  // sends the image we saved by filename.
  app.get("/:filename", function(req, res){
      var readstream = gfs.createReadStream({filename: req.params.filename});
      readstream.on("error", function(err){
        res.send("No image found with that title");
      });
      readstream.pipe(res);
  });

  //delete the image
  app.get("/delete/:filename", function(req, res){
    gfs.exist({filename: req.params.filename}, function(err, found){
      if(err) return res.send("Error occured");
      if(found){
        gfs.remove({filename: req.params.filename}, function(err){
          if(err) return res.send("Error occured");
          res.send("Image deleted!");
        });
      } else{
        res.send("No image found with that title");
      }
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
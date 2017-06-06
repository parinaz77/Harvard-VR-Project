const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const indexRoutes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});
const app = express();


const port = process.env.PORT 
app.listen()

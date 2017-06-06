const express = require('express');

const app = express();
const indexRoutes = require('./routes/index');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
	console.log('Listening on port 3000!');
});


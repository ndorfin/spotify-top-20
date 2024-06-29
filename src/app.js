let express = require('express');
let { searchAPI } = require('./spotify-api.js');

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/search', async (req, res, next) => {
	try {
		await searchAPI(req.query).then(response => {
			console.log('items', response.tracks.items);
		});
	} catch(error) {
		return next(error);
	}
});

console.log('Listening on 8888');
app.listen(8888);
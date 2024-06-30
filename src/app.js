let express = require('express');
let { searchAPI } = require('./api/spotify.js');
let app = express();
let nunjucks = require('nunjucks');

nunjucks.configure(__dirname + '/views', {
	autoescape: true,
	express: app
});

app.set('view engine', 'njk');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/search', async (req, res, next) => {
	try {
		let addedTracks = req.query.add;
		let queryValue = req.query.query_text;
		let offset = req.query.offset || 0;
		await searchAPI(queryValue, offset).then(items => {
			res.render('search', {
				query: queryValue,
				items: items,
				offset: offset,
				addedTracks: [...addedTracks],
			});
		});
	} catch(error) {
		return next(error);
	}
});

app.get('/source-songs', async (req, res) => {
	let addedTracks = req.query.add;
	res.render('source-songs', {addedTracks: [...addedTracks]});
});

app.get('/preview-recommendations', async (req, res) => {
	let addedTracks = req.query.add;
	res.render('preview-recommendations', {addedTracks: [...addedTracks]});
});

console.log('Listening on 8888');
app.listen(8888);
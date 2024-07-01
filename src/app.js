let express = require('express');
let { searchAPI, tracksInfoAPI } = require('./api/spotify.js');
let app = express();
let nunjucks = require('nunjucks');

/* Express configuration */
nunjucks.configure(__dirname + '/views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'njk');
app.use(express.static(__dirname + '/public'));

/* Routes */
app.get('/', (req, res) => {
	res.render('home', {
		offset: 0
	});
});

app.get('/search', async (req, res, next) => {
	let search = req.query.search;
	let offset = req.query.offset || 0;
	let selected = [];

	if (req.query.selected) {
		selected = Array.isArray(req.query.selected) ? req.query.selected : [req.query.selected];
	}

	console.log('selected', selected);

	try {
		await searchAPI(search, offset).then(tracks => {
			res.render('search', {
				search: search,
				results: tracks,
				offset: offset,
				selected: selected,
			});
		});
	} catch(error) {
		return next(error);
	}
});

app.get('/selected-songs', async (req, res, next) => {
	let newTrackIds = [req.query.add];
	let queryValue = req.query.search;
	let offset = req.query.offset || 0;
	if (req.query.selected) newTrackIds.push(req.query.selected);
	
	console.log('newTrackIds', newTrackIds);

	try {
		await tracksInfoAPI(newTrackIds).then(formattedTracks => {
			res.render('selected-songs', {
				selected: newTrackIds,
				tracks: [...formattedTracks],
				search: queryValue,
				offset: offset,
			});
		});
	} catch(error) {
		return next(error);
	}
});

app.get('/preview-recommendations', async (req, res) => {
	let addedTracks = req.query.add;
	res.render('preview-recommendations', {addedTracks: [...addedTracks]});
});

console.log('Listening on 8888');
app.listen(8888);
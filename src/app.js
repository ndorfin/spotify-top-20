let express = require('express');
let { searchAPI, tracksInfoAPI, recommendationsAPI } = require('./api/spotify.js');
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
	let selected = [];
	let search = req.query.search;
	let offset = req.query.new_offset || req.query.offset;

	if (req.query.selected) {
		selected = Array.isArray(req.query.selected) ? req.query.selected : [req.query.selected];
	}

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
	let selected = [];
	let search = req.query.search;
	let offset = req.query.offset || 0;
	if (req.query.selected) {
		selected = Array.isArray(req.query.selected) ? req.query.selected : [req.query.selected];
	}
	if (req.query.add) {
		selected.push(req.query.add);
	}
	if (req.query.remove) {
		let targetIndex = selected.indexOf(req.query.remove);
		selected.splice(targetIndex, 1);
	}

	if (selected.length) {
		try {
			await tracksInfoAPI(selected).then(formattedTracks => {
				res.render('selected-songs', {
					selected: selected,
					tracks: formattedTracks,
					search: search,
					offset: offset,
				});
			});
		} catch(error) {
			return next(error);
		}
	} else {
		res.render('selected-songs', {
			selected: selected,
			tracks: [],
			search: search,
			offset: offset,
		});
	}
});

app.get('/preview-recommendations', async (req, res, next) => {
	let selected = [];
	if (req.query.selected) {
		selected = Array.isArray(req.query.selected) ? req.query.selected : [req.query.selected];
	}

	try {
		await recommendationsAPI(selected).then(formattedTracks => {
			res.render('preview-recommendations', {
				selected: selected,
				tracks: formattedTracks
			});
		});
	} catch(error) {
		return next(error);
	}
});

console.log('Listening on 8888');
app.listen(8888);
let express = require('express');
let { searchAPI } = require('./spotify-api.js');
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
		let queryValue = req.query.q;
		await searchAPI(queryValue).then(response => {
			res.render('search', {
				query: queryValue,
				items: response.tracks.items
			});
		});
	} catch(error) {
		return next(error);
	}
});

console.log('Listening on 8888');
app.listen(8888);
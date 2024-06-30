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
		let queryValue = req.query.query_text;
		await searchAPI(queryValue).then(items => {
			res.render('search', {
				query: queryValue,
				items: items
			});
		});
	} catch(error) {
		return next(error);
	}
});

console.log('Listening on 8888');
app.listen(8888);
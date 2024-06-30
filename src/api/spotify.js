const formatTracksDataFromSpotify = require('../formatters/tracks.js');
const ENDPOINTS = {
	SEARCH: 'https://api.spotify.com/v1/search',
	TOKEN: 'https://accounts.spotify.com/api/token',
}

let accessToken = null;
let expiryTime = null;

function tokenIsStale() {
	const leewayTime = 10; // seconds
	return !expiryTime || expiryTime >= (new Date(Date.now()).getTime() - leewayTime);
}

function setNewTokenExpiry(time) {
	expiryTime = new Date(Date.now()).getTime() + time;
}

async function getToken() {
	try {
		const response = await fetch(ENDPOINTS.TOKEN, {
			method: 'POST',
			body: new URLSearchParams({
				'grant_type': 'client_credentials',
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.SECRET).toString('base64')),
			},
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(error.message);
	}
}

async function search(query) {
	try {
		const searchParams = new URLSearchParams({
			q: query,
			type: 'track',
		});
		const searchURL = `${ENDPOINTS.SEARCH}?${searchParams}`;
		const response = await fetch(searchURL, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + accessToken,
			},
		});
		
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		return await response.json();
	
	} catch (error) {
		console.error(error.message);
	}
}

async function searchAPI(queryValue) {
	if (tokenIsStale()) {
		await getToken().then(tokenResponse => {
			accessToken = tokenResponse.access_token;
			expiryTime = setNewTokenExpiry(tokenResponse.expires_in);
		});
	}
	return await search(queryValue).then(searchResponse => {
		return formatTracksDataFromSpotify(searchResponse.tracks.items);
	});
}

module.exports = {
	searchAPI: searchAPI
};
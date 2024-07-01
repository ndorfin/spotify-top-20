const formatTracksDataFromSpotify = require('../formatters/tracks.js');
const ENDPOINTS = {
	RECOMMENDATIONS: 'https://api.spotify.com/v1/recommendations',
	SEARCH: 'https://api.spotify.com/v1/search',
	TOKEN: 'https://accounts.spotify.com/api/token',
	TRACKS_INFO: 'https://api.spotify.com/v1/tracks',
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

async function search(query, offset) {
	try {
		const searchParams = new URLSearchParams({
			q: query,
			type: 'track',
			limit: 5,
			offset: offset
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

async function searchAPI(queryValue, offset) {
	if (tokenIsStale()) {
		await getToken().then(tokenResponse => {
			accessToken = tokenResponse.access_token;
			expiryTime = setNewTokenExpiry(tokenResponse.expires_in);
		});
	}
	return await search(queryValue, offset).then(searchResponse => {
		return formatTracksDataFromSpotify(searchResponse.tracks.items);
	});
}

async function trackInfo(trackIds) {
	try {
		const searchParams = new URLSearchParams({
			ids: trackIds
		});
		const searchURL = `${ENDPOINTS.TRACKS_INFO}?${searchParams}`;
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

async function tracksInfoAPI(trackIds) {
	if (tokenIsStale()) {
		await getToken().then(tokenResponse => {
			accessToken = tokenResponse.access_token;
			expiryTime = setNewTokenExpiry(tokenResponse.expires_in);
		});
	}
	return await trackInfo(trackIds).then(trackInfoResponse => {
		return formatTracksDataFromSpotify(trackInfoResponse.tracks);
	});
}

async function recommendations(trackIds) {
	try {
		const searchParams = new URLSearchParams({
			seed_tracks: trackIds,
			limit: 20,
		});
		const searchURL = `${ENDPOINTS.RECOMMENDATIONS}?${searchParams}`;
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

async function recommendationsAPI(trackIds) {
	if (tokenIsStale()) {
		await getToken().then(tokenResponse => {
			accessToken = tokenResponse.access_token;
			expiryTime = setNewTokenExpiry(tokenResponse.expires_in);
		});
	}
	return await recommendations(trackIds).then(trackInfoResponse => {
		return formatTracksDataFromSpotify(trackInfoResponse.tracks);
	});
}

module.exports = {
	searchAPI: searchAPI,
	tracksInfoAPI: tracksInfoAPI,
	recommendationsAPI: recommendationsAPI,
};
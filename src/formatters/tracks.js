function formatDuration(duration_ms) {
	const dateObj = new Date(Date.UTC(0,0,0,0,0,0,duration_ms));
  let parts = [];
	// Only include hours if greater than 0
	if (dateObj.getUTCHours()) {
		parts.push(dateObj.getUTCHours());
	}
	// We want a minimum date string of zero-padded MM:SS
	parts.push(dateObj.getUTCMinutes());
	parts.push(dateObj.getUTCSeconds());
  return parts.map(s => String(s).padStart(2,'0')).join(':');
}

function formatArtists(artists) {
	if (artists.length === 1) {
		return artists[0].name;
	}
	// Return a comma separated string of artists if there's nore than 1
	return artists.map(artist => artist.name).join(', ');
}

function formatImages(images) {
	let imagesTemplate = {
		large: images.find(imageObj => imageObj.height === 640).url,
		default: images.find(imageObj => imageObj.height === 300).url,
	}
	return imagesTemplate;
}

function formatTracksDataFromSpotify(spotifyTrackData) {
	let formattedData = [];

	spotifyTrackData.forEach(track => {
		let trackTemplate = {
			id: track.id,
			artists: formatArtists(track.artists),
			name: track.name,
			album_name: track.album.name,
			duration: formatDuration(track.duration_ms),
			album_images: formatImages(track.album.images),
		}
		formattedData.push(trackTemplate);
	});

	return formattedData;
}
module.exports = formatTracksDataFromSpotify;
# Spotify: Top 20

This repo is the basis for a take-home-project I was assigned during an interview process.

Read more:

- [The project goals](./docs/goals.md)
- [The Journey](./docs/journey.md)

## Local environment

Requires:

- Node.js ~20.12.2
- A Spotify Developer Account
	- that has a custom app defined
		- that has a client ID and secret

Set up your local environment:

1. Copy the [`.env.sample`](./.env.sample) as `.env`:\
	 `cp .env.sample .env`
1. Adjust the values in `.env` to your Spotify Developer account details for the app associated with this Node application
1. Finally, install the dependencies:\
	 `npm i`

To start the local environment:

- `npm start`

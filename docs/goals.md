# The project goal

> Create a basic application that integrates with the Spotify API to allow users to search for songs by title, display the search results in a grid or list format, provide pagination to load more results, and enable users to create custom ‘Top 20’ recommended playlists.
> 
> Choose a language you prefer and what you're comfortable with, keeping a focus on simple, idiomatic code. We recommend that you spend no more than 2-3 hours on this task.

## Intpretation

Most of the goal is straight-forward, but I'm struggling a little with this line:

> enable users to create custom ‘Top 20’ recommended playlists.

I'm not sure if this means:

- A. the user decides on their custom Top 20 by choosing songs, or
- B. the system recommends a customised Top 20, based on the chosen songs.

I'll need to look at the Spotify API to see if it provides such functionality for B, if so, I'll take that as the desired meaning.

### Spotify API recommendations

It looks like Spotify has the desired [Get Recommendations](https://developer.spotify.com/documentation/web-api/reference/get-recommendations) API. It takes up to 5 songs, or 5 artists, or 5 genres as input. It conveniently defaults to a limit of 20 tracks in the output, as per the project goal.

This is probably the desired intent of the goal.
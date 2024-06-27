# The journey

This document is to help keep track of my decisions and the paths I took during development of this project, in trying to meet
[The project goals](./goals.md).

## Initial thoughts

The interviewer uses Vue.js in their daily front-end work, but my strengths are situated in web-friendly tech, and in progressive enhancement.
They do use Ruby on Rails on the back-end though, so maybe there's an opportunity here to demonstrate my Rails 7 capabilities.

### Architecture

Some primary concerns:

- **Persistence**:\
  We'll probably want some sort of data persistence here, so that the user can open/close the app and not lose their session and/or playlists
- **Source of truth:**\
  It might be better to represent the user as a Spotify user, using OAuth. This has implications on where we store those credentials.
  Alternatively (and naively), the app could take control in managing the playlists, and the user is a synthetic and anonymous Spotify user. For playback to happen within the app, then we'll need OAuth again.
- **UI State management**:\
  The lo-fi application design might incur state management requirements. e.g. if the App is a do-everything-in-one-screen app, then we'll need very limited state management. But if there are distinct screens that the user has to flip between when finding songs, and managing a playlist, then we might need something to manage those screen dependencies.
  Ultimately, we might be able to get away with having several modes in the app, where everything is loaded into the context at all times.

I'm not a big fan of UI state management on the client. This is usually a signifier that business logic is spread throughout the stack, rather than in one central place (the back-end). Pushing complexity to the client leads to performance implications, brittleness, and longer/larger/more risky development effort in total. [The client environment is a hostile one].

So, with those concerns in mind, let's see if some low-level design work (storyboarding/wireframing) can help us achieve a reasonable outcome.

### Storyboard

WIP


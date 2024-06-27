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
  Alternatively (and naively), the app could take control in managing the playlists, and the user is a synthetic and anonymous Spotify user. For playback to happen within the app, or for these playlists to be electively saved to Spotify, then we'll need OAuth again.
- **UI State management**:\
  The lo-fi application design might incur state management requirements. e.g. if the App is a do-everything-in-one-screen app, then we'll need very limited state management. But if there are distinct screens that the user has to flip between when finding songs, and managing a playlist, then we might need something to manage those screen dependencies.
  Ultimately, we might be able to get away with having several modes in the app, where everything is loaded into the context at all times.

I'm not a big fan of UI state management on the client. This is usually a signifier that business logic is spread throughout the stack, rather than in one central place (the back-end). Pushing complexity to the client leads to performance implications, brittleness, and longer/larger/more risky development effort in total. [The client environment is a hostile one].

So, with those concerns in mind, let's see if some low-level design work (storyboarding/wireframing) can help us achieve a reasonable outcome.

### Storyboard / Flows

Some questions popped up during mocking up the workflows:

#### 1. Can an anonymous user start forming a new recommended playlist? Or does Spotify take into account a known user's preferences when recommending playlists?

This answer could influence whether the user needs to log in prior to creating their recommendations, which might be less desireable, and has implications on the API use.

It looks like the Spotify Recommendations API doesn't require an associated user.

#### 2. Do we want to prioritise guest users?

A guest user could start seeing immediate value, without having to complete the challenge of authenticating via Spotify first.

![Guest user flow](./images/guest-user.png)

Whereas, if the user authenticated first, they'd get a more 'management' experience over their playlists.

![Recognised user flow](./images/recognised-user.png)

The more I think about it, the more I dislike the idea of the 'management' aspects of the application. They also don't gel well with the project goals: A recommendation engine only.

#### 3. Can we simplify this flow?

Certainly.

Let's get rid of the 'all playlists' and 'home' notions, and go with a simple wizard-like flow that saves to your Spotify profile.

![Simple flow](./images/simple-flow.png)

### Wireframes

WIP
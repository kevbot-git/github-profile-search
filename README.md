# GitHub Profile Search

This is a Next.js app I've spun up to do the sample project as per the [project brief](https://github.com/florinpop17/app-ideas/blob/master/Projects/2-Intermediate/GitHub-Profiles.md). It is live at [https://github-profile-search-ochre.vercel.app/](https://github-profile-search-ochre.vercel.app/)!

## Running the project

1. Recommended: use `nvm use` to use the same node version as me (lts/hydrogen)
2. Run `yarn` to install the project dependencies
3. Run `yarn dev` to run the project locally

## User Stories

-   [x] User can enter a username
-   [x] User can click on search button to retrieve information
-   [x] User can see the avatar, username, followers and repository count of searched user
-   [x] User can see the top 4 repositories of searched user
-   [x] User should get an alert if the username is not valid

## Bonus features

-  [ ] User can toggle dark/light mode
-  [ ] Selected mode should persist when user comes back to the app again

## What I would improve next

- [ ] Show user results on a separate page so that the url stored the username query
- [ ] Find out how to toggle dark/light while first respecting the browser's prefers-color-theme
- [ ] Use an i18n pattern to keep concern of copy separate

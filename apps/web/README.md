# Site Capture Web

Frontend for [Site Capture](https://github.com/prixladi/site-capture) project.<br />

## Yarn

When using **Yarn** keep in mind that you need to run additional services for the app to function properly. You can use docker as described below. If you decide to use another method you will probably need to change the default configuration.

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see some lint errors in the console.

### `yarn build`

Builds the app for production, including prerendering SSG-ready pages.<br />
The App is ready to be deployed!

## Docker

### `docker build .`

Builds a production-ready image.

### `docker-compose up`

Runs app container and other containers (**MongoDB, Redis, Authorization  Service, Site Capture Server, etc...**) and builds app image if does not exist.

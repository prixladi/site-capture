# Site Capture Puppet

Worker service processing site capturing using puppeteer.
Part of [Site Capture](https://github.com/prixladi/site-capture) project.

## Yarn

When using **Yarn** keep in mind that you need to run additional services for the worker to function properly. You can use docker as described below. If you decide to use another method you will probably need to change the default configuration.

### `yarn start`

Runs the app in the development mode.

The app will restart if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `dist` folder.<br />
The App is ready to be deployed!

## Docker

### `docker build .`

Builds a production-ready image.

### `docker-compose up`

Runs app container and other containers (**MongoDB, Redis, Authorization Service, Site Capture Server, etc...**) and builds app image if does not exist.

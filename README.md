# Site Capture

Application for capturing screenshots of defined sites using predefined parameters. Application supports templates for shared definitions of quality, viewports, etc...

## Applications

- [Frontend](/apps/web) - next.js web application and administration communicating with backend
- [Backend](/apps/server) - nodejs backend server storing data to mongo and sending events through redis to the puppet
- [Puppet](/apps/puppet) - nodejs worker using puppeteer processing work requests send by backend through redis

## External

- [Authority](https://github.com/prixladi/shamyr-cloud-authority) - identity provider
- [MongoDB](https://www.mongodb.com/) - main database
- [Redis](https://redis.io/) - cache and event emitter

## Application images

![index](assets/index.png)

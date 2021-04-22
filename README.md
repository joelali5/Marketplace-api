# NC Marketplace api for FE sprint

This is an express server for the students to use during the (fe-nc-marketplace sprint)[https://github.com/northcoders/fe-nc-marketplace]

## Hosting

The server and db are hosted on the dev team heroku account.

### Deployment

Continuous deployment is setup from the `main` branch of this repo. Any pushes to this branch will be deployed.

### Seeding

There are `seed-dev` and `seed-prod` scripts for manual seeding. As the sprint involves students all working from the DB and accidental infinite loops and the like are common there is a endpoint to reseed the db back to the initial state. This isn't in the students api ref, just to make our lives easier.

```bash
POST /api/reset
```

## Endpoints

TODO - fill me in
TODO - add search endpoint
TODO - exclude a users own items

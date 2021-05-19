# NC Marketplace api for FE sprint

This is an express server for the students to use during the [fe-nc-marketplace sprint](https://github.com/northcoders/fe-nc-marketplace)

## Hosting

The server and db are hosted on the dev team heroku account.

[https://nc-marketplace.herokuapp.com/](https://nc-marketplace.herokuapp.com/)

### Deployment

Continuous deployment is setup from the `main` branch of this repo. Any pushes to this branch will be deployed.

### Seeding

There are `seed-dev` and `seed-prod` scripts for manual seeding. As the sprint involves students all working from the DB and accidental infinite loops and the like are common there is a endpoint to reseed the db back to the initial state. This isn't in the students api ref, just to make our lives easier.

```bash
POST /api/reset
```

## Docs

API docs are written using [Docusaurus](https://docusaurus.io/) and hosted on the path '/'.

### Updating docs

The docs site is a React app. Navigate to /docs for the source code. Edit the markdown files in /docs to update the site. You can start a dev version using `npm run dev-docs` to check your changes. See the [docusaurus docs](https://docusaurus.io/docs/docs-introduction) for the markdown format.

Once updated run the build script `npm run build-docs` and re-deploy the repo.

## Further Development

The original idea was to act like facebook marketplace where users would post items that would then be bought by other users. This would mean ordered items are removed from the available items on GET /api/items. Decided against this for simplicity during the sprint so items can be added to the basket or ordered multiple times without removing them from the list causing students to run out of items.

### TODO

- [ ] add more dev data to make it interesting
- [x] price queries on GET /api/items
- [ ] add posted by to items
- [ ] exclude a users own items from available items?

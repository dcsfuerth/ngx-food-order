# ngx-food-order

Reference project for Angular development at DCS Fürth.

The purpose of thie project is to provide some sample code how we develop applications with angular, redux, typescript webpack ...

## Setup

After cloning the project, run the usual

```bash
npm install
```

After that you need to start two npm tasks

```bash
npm run watch:hmr
```

and

```bash
npm run backend:mock
```

then visit http://locaslhost:3000 in your browser.

For the production build run

```bash
npm run build:production
npm run serve:production
```

then visit http://locaslhost:8080 in your browser.


## What's inside

The app consists of two simple CRUD interfaces (users, products) and a more complex module (order).

Users is an example on how to manually implement a CRUD with redux, async API requests and smart/dumb components.

Products basically does the same, but utilizes standardized reducer and selector factories developed at DCS,
that can be used in many scenarios.

Order ist the most complex interface with live editing and backend sync, complex selectors using different parts of the state and an example for child routes.



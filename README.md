# Google Maps store searcher

## Description

Angular 14 frontend with google maps API integration for autocomplete addresses and search near stores

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Features

- [x] Google Maps API.
- [x] Lazy Loading.
- [x] Material UI.
- [x] Simple Login.
- [x] Testing.
- [x] Interceptor for auth and handle errors.
- [x] ESLint.
- [x] Prettier.

## Start development in localhost

```bash
git clone --depth 1 https://github.com/GMezaPostigo/angular-google-maps-stores-searcher.git angular-app
cd angular-app
```

Generate your google maps api key

Update environment.ts file `googleApiKey: ''` to `googleApiKey: '{YOUR_GOOGLE_API_KEY}'`


Start project:

```bash
npm install

ng serve --open
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Test

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

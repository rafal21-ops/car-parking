# SYZYGY Car Parking

## Initial project configuration

### Configure enviroment variables
Create `src/enviroments/environment.development.ts` file yourself or use provided example:
```sh
cp src/enviroments/environment.development.ts.example src/enviroments/environment.development.ts
```
This file will not be committed to the repository, allowing you to modify the development setup without conflicting with other developers.

### Install required dependences
```sh
npm install
npx playwright install
```

## npm scripts
First of all, naming convention for scripts is `target:[configuration]`, where `configuration` is one of `production`, `development` or `test`. If `configuration` is ommited then `production` is used. Also some targets don't have all configurations if it doesn't make sens.

Most useful ones are listed below. For more check `package.json`.

### Run the dev server

```sh
npm run start:dev
```

### Create a production bundle

```sh
npm run build
```

### Run e2e tests

```sh
npm run e2e
```

### Run everything: lint, unit tests, build and e2e tests (also used by CI)

```sh
npm run build-and-test
```

## Contributing

### Archtecture
Get to know what is Clean Architecture... then, come back and write some code. xD

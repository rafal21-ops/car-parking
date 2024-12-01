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

## Development

To run the dev server use:

```sh
npm run start:dev
```

To create a production bundle use:

```sh
npm run build
```

To run e2e tests run:

```sh
npm run e2e
```

To lint, test & build for CI purposed use:

```sh
npm run build-and-test
```

## Contributing

### Archtecture
Get to know what is Clean Architecture... then, come back and write some code. xD

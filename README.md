# Description for Component Library

## 1. Task link

[Click here](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)

## 2. How to run the app

### `npm run dev`

[npm package](https://www.npmjs.com/package/@vlad-aleynikov/custom-component-lib)

To install library to your app run

### `npm i @vlad-aleynikov/custom-component-lib`

## 3. Other comands

### `npm run test`

Run `tests` for all the commands.

### `npm run lint`

Check all the `lint` rules in `.js` files

### `npm run lint:fix`

Fix all posible `lint` errors

### `npm run storybook`

To run `storybook` server

### `npm run build:dev`

Builds the app for development to the `build` folder.\

### `npm run build:prod`

Builds the app for production to the `build` folder.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run publish`

Publish builded app to `npmjs.com` as `@vlad-aleynikov/custom-component-lib` npm package.\
It also increase version and build project before publishing.

## 4. Folders structure

`/src` folder is root directory, it contains all the files, we are working with, test and storybook folders.

`/build` folder needed for builded application.

`/config` folder with webpack configuration.

`src/components` contain all the components

`src/storybook` contain files to run storybook

`src/tests` contain all the tests
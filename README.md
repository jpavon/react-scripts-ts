# react-scripts-ts

[![npm version](https://badge.fury.io/js/%40jpavon%2Freact-scripts-ts.svg)](https://badge.fury.io/js/%40jpavon%2Freact-scripts-ts)

Fork of [react-script-ts](https://github.com/wmonk/create-react-app-typescript) with added features.


## Added features

- Faster typescript and tslint compiles
- Sass
- Import .svg files as react components using react-svg-loader

## Creating a new project

```
npx create-react-app my-app --scripts-version=@jpavon/react-scripts-ts
cd my-app/
yarn start
```
(npx comes with npm 5.2+ and higher)

## If you have a project already using create-react-app

```
yarn add @jpavon/react-scripts-ts
```

Change your package.json configuration to use react-scripts-ts

```
"scripts": {
  "start": "react-scripts-ts start",
  "build": "react-scripts-ts build",
  "test": "react-scripts-ts test --env=jsdom",
  "eject": "react-scripts-ts eject"
},
```

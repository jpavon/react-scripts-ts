# react-scripts-ts

Fork of react-script-ts (https://github.com/wmonk/create-react-app-typescript) with added features.


### Added features

- sass-loader

### Creating a new project

```
npx create-react-app my-app --scripts-version=@jpavon/react-scripts-ts
cd my-app/
yarn start
```
(npx comes with npm 5.2+ and higher)

### If you have a project already using create-react-app

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

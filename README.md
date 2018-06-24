# react-scripts-ts

> *Note: Until 1.0.0 this project won't follow semver. Though there won't be many breaking changes, update at your own risk.*

[![NPM](https://img.shields.io/npm/v/@jpavon/react-scripts-ts.svg)](https://www.npmjs.com/package/@jpavon/react-scripts-ts)

Fork of [react-script-ts](https://github.com/wmonk/create-react-app-typescript) with added features.

Found any problem or bug? Please [create a new issue](https://github.com/jpavon/react-scripts-ts/issues).

## Features

- Webpack 4
- TypeScript compilation [ts-loader](https://github.com/TypeStrong/ts-loader)
- Type and tslint errors on a separate process [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin)
- Sass and Css Modules [css-modules](https://github.com/css-modules/css-modules)
- Tranform SVG into React components [svgr](https://github.com/smooth-code/svgr)
- Use `.js|.jsx` and `.ts|.tsx` files together.

Check the [template files](template) for usage examples.

## Add it to your project

### New project

```bash
npx create-react-app my-app --scripts-version=@jpavon/react-scripts-ts
cd my-app/
yarn start
```
(npx comes with npm 5.2+ and higher)

#### Already using create-react-app?

```bash
yarn add @jpavon/react-scripts-ts
```

Change your package.json configuration to use react-scripts-ts

```json
{
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
  }
}
```

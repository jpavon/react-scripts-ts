## ![react-scripts-ts](template/src/logo.svg)&nbsp;&nbsp;&nbsp;<span>+</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/remojansen/logo.ts/raw/master/ts.png"  width="70" height="70" />

![License](https://img.shields.io/github/license/jpavon/react-scripts-ts.svg)
[![NPM](https://img.shields.io/npm/v/@jpavon/react-scripts-ts.svg)](https://www.npmjs.com/package/@jpavon/react-scripts-ts)
[![CircleCI Status](https://circleci.com/gh/jpavon/react-scripts-ts.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jpavon/react-scripts-ts)

# @jpavon/react-scripts-ts

Modern build setup with no configuration for React + TypeScript projects.

### Main differences with create react app:

- [Faster build times](https://github.com/jpavon/react-scripts-ts/issues/7#issue-394549780)
- [Namespaces support](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [Module resolution support (baseUrl/paths)](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- Type checking	on a separate proccess
- Transpilation using [ts-loader](https://github.com/TypeStrong/ts-loader)
- Provide compile-time information for styled components [typescript-plugin-styled-components](https://github.com/Igorbek/typescript-plugin-styled-components)

Found any problem or bug? Please [create a new issue](https://github.com/jpavon/react-scripts-ts/issues).

## Features

- Webpack 4
- TypeScript compilation [ts-loader](https://github.com/TypeStrong/ts-loader)
- Type and tslint errors on a separate process [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin)
- Sass and Css Modules [css-modules](https://github.com/css-modules/css-modules)
- Generate TypeScript typings for CSS modules [typings-for-css-modules-loader](https://github.com/jpavon/typings-for-css-modules-loader)
- Tranform SVG into React components [svgr](https://github.com/smooth-code/svgr)
- Use `.js|.jsx` and `.ts|.tsx` files together.

Check out the [template files](template) for usage examples.

# Getting started

## Create a new project:

```bash
npx create-react-app my-app --scripts-version=@jpavon/react-scripts-ts
cd my-app/
yarn start
```
(npx comes with npm 5.2+ and higher)

## Already using create-react-app / react-scripts?

Install this package in yout project:

```bash
yarn add @jpavon/react-scripts-ts
```

Change your package.json configuration to use react-scripts-ts

```json
{
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
  }
}
```

# Ejecting

Ejecting is not supported in this project, you have 2 options:

- Fork this project and create your own react-scripts-ts package.

- Use [react-app-rewired](https://github.com/timarney/react-app-rewired) with [custom scripts versions](https://github.com/timarney/react-app-rewired#2-custom-scripts-versions):

```json
{
  "scripts": {
    "start": "react-app-rewired start --scripts-version @jpavon/react-scripts-ts",
    "build": "react-app-rewired build --scripts-version @jpavon/react-scripts-ts",
    "test": "react-app-rewired test --scripts-version @jpavon/react-scripts-ts --env=jsdom"
  }
}
```

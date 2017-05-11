# an es6-angular adaption of a Flickr carousel using angularjs-webpack-seed (seed-webapp-1.0)
Adaption of the AngularJS and Webpack Seed Project for The Greenhouse that retools a basic es5 Javascript app and moves it into ES6.  For reference the 
Greenhouse project lives at:
https://github.com/thegreenhouseio/angularjs-webpack-seed

## Tooling
The following tools are used in the application

- [AngularJS][] - as the Front-End framework
- [Webpack][] 2 - Module loader / bundler, primary build tool
- [Node][] 6  - local development and build time JavaScript runtime
- [Yarn][] - package manager for build and application dependencies

[Node]: https://nodejs.org/
[Yarn]: https://yarnpkg.com/en/
[AngularJS]: https://angularjs.io/
[Webpack]: https://webpack.github.io/

## Links
* Repository (Github)- https://github.com/benmcosker/vanillajs-exercise

## Project Setup
**Note**: It is recommended that a Javascript based IDE is used, like [Webstorm][],
as they have a lot of the code quality and syntax tooling supported as plugins, often times right out of the box.

Recommended plugins to have are:
- Git (can show changed lines in the gutter when viewing a file)
- EditorConfig
- gitignore
- Sass
- NodeJS

[Webstorm]: https://www.jetbrains.com/webstorm/

### Installation

1. If you don't already have it, download and install NodeJS (comes with NPM).
2. This project favors Yarn, so make sure you have the expected by version by installing it after installing Node

```
$ npm install -g yarn@0.21.3
```

3) Now install the build and application dependencies by running `$ yarn install` (Vagrant will do this for you)

## Project Layout
An overview of important files and configurations for the applications

### Root Files
Also know as "dot" files, these are the build and build configuration files for the application

* _bin/_ - shell scripts for continuous and build environments
* _.editorconfig_ - configuration file for EditorConfig IDE plugin
* _.eslintrc_ - configuratin file for [ESLint](http://eslint.org/)
* _package.json_ - dependency configuration file, for project related dependencies and defines all runnable scripts and commands
* _webpack.config.common.js_ - webpack config for managing shared webpack configurations
* _webpack.config.develop.js_ - webpack config for local development
* _webpack.config.prod.js_ - webpack config for production builds

### Application Files
Application code, including unit tests.  Directories are intended to be kept as flat as possible with a B.O.F. (birds of
a feather) organization.
* _src_ - application code
* _src/components/_ - resusable UI features
* _src/services/_ -  APIs for handling backend REST APIs or browser APIs, non UI related "helpers"
* _src/views/_ -  routable states ("pages")
* _src/index.html_ - main layout of the application
* _src/index.js_ - main entry way into the application and Angular "bootstrapper" (`@NgModule`)
* _src/routes.js_ - routes for the application, maps to different views
* _src/vendor.js_ - vendor files from _node_modules_

## Tasks
This project uses Webpack as the build tool, exectuted via NPM scripts.  All available tasks are in the `scripts`
section of _package.json_

### Development
This will start up a Node (Express) server which watches for changes and "redeploys" as needed.

```
$ yarn run develop
```

See it in a browser by opening up

```
http://localhost:6789/
```

**Note: This task exports** `NODE_ENV=development`

### Production
This is the production build task for the project.  It is used prior to deploying to an environment and builds a
production version of the application.

```
$ yarn run build
```

###  Testing
adding testing component

```
$ yarn run test:unit
```

### Continuous Integration / Delivery
For CI / CD, the production task is combined with the testing task with whatever other relevant post task is need for 
that specific job's responsibility

```bash
$ export NODE_ENV=production
$ yarn run test:unit
$ yarn run build
```

### Serve / Run
To serve a production build locally , like for a demo run:

```
$ yarn run serve
```

**Note: it is recommended you run this command from the master branch or a tag.  By Default this proxies with the
 webpack-dev-server proxy.**

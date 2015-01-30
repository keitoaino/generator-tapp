# Web app generator

> [Yeoman](http://yeoman.io) generator that scaffolds out a front-end web app using [gulp](http://gulpjs.com/) for the build process

## Features

Please see our [gulpfile.js](app/templates/gulpfile.js) for up to date information on what we support.

* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Auto-compile Stylus
* Auto-compile CoffeeScript
* Templates using Jade
* Image optimization
* Automatically wire-up dependencies installed with [Bower](http://bower.io)

*For more information on what this generator can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in our `package.json`.*


## Getting Started

- Install dependencies: `npm install --global yo bower`
- Install the generator: `npm install --global generator-tapp`
- Run `yo tapp` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:production` to preview application like on production server
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production


## Options

- `--skip-install`
  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

- `--test-framework=<framework>`
  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

# package-list

A thin wrapper around `read-installed` to list installed packages during runtime. Includes support for listing missing and extraneous packages, and also works great when launched as a child process, which makes it a good candidate for tools like [pm2](https://github.com/Unitech/pm2) - instead of listing pm2's dependencies, it will list your own project's dependencies, as expected.

## Status

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

## Installation

```
$ npm install package-list
```

## Usage

### Command-line


```js
./node_modules/.bin/packages
```

### Programmatically

```js
var packages = require('package-list');

packages(function(err, pkgs) {
  if (err) throw err;

  console.log('Result is', pkgs);
});

// Result is { read-installed: '3.1.1', mocha: '1.21.1', should: '4.0.4' }
```

## Tests

```
$ npm test
```

## Author

[Rui Marinho](https://github.com/ruimarinho)

## License

MIT

[npm-image]: https://img.shields.io/npm/v/package-list.svg?style=flat
[npm-url]: https://npmjs.org/package/package-list
[travis-image]: https://img.shields.io/travis/seegno/package-list.svg?style=flat
[travis-url]: https://travis-ci.org/seegno/package-list

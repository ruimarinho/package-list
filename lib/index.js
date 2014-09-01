
/**
 * Module dependencies
 */

var readInstalled = require('read-installed');

/**
 * Retrieve the map of installed packages.
 *
 * @param  {Function} cb
 * @return {Object}
 */

var getInstalledPackages = function getInstalledPackages(cb) {
  readInstalled(process.cwd(), { depth: 0, dev: true }, function(err, map) {
    if (err) return cb(error);

    if (!map) {
      return cb(new Error('Unable to retrieve map of installed packages'));
    }

    var packages = {};

    for (var pkg in map.dependencies) {
      var version = map.dependencies[pkg].version;

      if (!version) {
        version = '(missing)';
      } else if (!!map.dependencies[pkg].extraneous) {
        version += ' (extraneous)';
      }

      packages[pkg] = version;
    }

    cb(err, packages);
  });
};

/**
 * Expose `getInstalledPackages`
 */

module.exports = getInstalledPackages;

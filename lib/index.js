
/**
 * Module dependencies
 */

var npm = require('npm');

/**
 * Retrieve the list of installed packages.
 *
 * @param  {Function} cb
 * @return {Object}
 */

var getInstalledPackages = function getInstalledPackages(cb) {
  npm.load({ depth: 0 }, function () {
    npm.commands.list([], true, function(err, data, list) {
      if (err) return cb(error);

      if (!list) {
        return cb(new Error('Unable to retrieve list of installed packages'));
      }

      var packages = {};

      for (var pkg in list.dependencies) {
        var version = list.dependencies[pkg].version;

        if (!!list.dependencies[pkg].extraneous) {
          version += ' (extraneous)';
        }

        if (list.dependencies[pkg].missing) {
          version = '(missing)';
        }

        packages[pkg] = version;
      }

      cb(err, packages);
    });
  });
};

/**
 * Expose `getInstalledPackages`
 *
 */
module.exports = getInstalledPackages;

#!/usr/bin/env node

var packages = require('../lib');

packages(function(err, pkgs) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(JSON.stringify(pkgs));
  process.exit(0);
});

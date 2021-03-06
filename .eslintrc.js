module.exports = {
  "extends": "airbnb",
  "env": {
  "browser": true,
  "node": true,
  "jest": true,
  "commonjs": true
  },
  // "ignorePatterns": ["bundle.js", "node_modules"],
  "rules": {
    "linebreak-style": "off",
    "no-console": "off",
    "radix": "off", // because target is not prior to ES5
  }
};
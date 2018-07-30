{
  "name": "tfjs-examples-cart-pole",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "license": "Apache-2.0",
  "private": true,
  "engines": {
    "node": ">=8.9.0"
  },
  "dependencies": {
    "@tensorflow/tfjs": "^0.12.0",
    "vega-embed": "^3.0.0"
  },
  "scripts": {
    "build": "cross-env NODE_ENV=production parcel build index.html --no-minify --public-url ./",
    "watch": "./serve.sh",
    "postinstall": "yarn upgrade --pattern @tensorflow"
  },
  "devDependencies": {
    "babel-plugin-transform-runtime": "~6.23.0",
    "babel-polyfill": "~6.26.0",
    "babel-preset-env": "~1.6.1",
    "clang-format": "~1.2.2",
    "cross-env": "^5.1.6",
    "http-server": "~0.10.0",
    "parcel-bundler": "~1.8.1",
    "typescript": "^2.9.2"
  }
}
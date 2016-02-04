var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: __dirname,
  // the main entry point for our application's frontend JS
  entry: './app/assets/frontend/javascripts/entry.js',
};

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(__dirname, 'app', 'assets', 'javascripts'),
  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: 'bundle.js',
  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  publicPath: '/assets',
};

config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js', '.jsx', '.less'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
   modulesDirectories: ['node_modules'],
};

config.module = {
    loaders:  [
                {test: require.resolve('react'), loader: 'expose?React'},
                {test: /\.jsx?$/, loaders: ['react-hot', 'babel']},
                { test: /\.js$/, loader: 'babel'}
              ]
  }

config.externals = {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        // 'react': 'React'
    }
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config.js");
var path = require("path");

var compiler = webpack(config);

webpack(config, function(err, stats) {
  if(err) {
    console.error(err);
  } else {
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0)
        console.error(jsonStats.errors.join('\n'));
    if(jsonStats.warnings.length > 0)
        console.warn(jsonStats.errors.join('\n'));
      
    console.log(stats.toString());
  }
});
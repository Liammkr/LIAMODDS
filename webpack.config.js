const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      net: false,
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
    },
  },
};
